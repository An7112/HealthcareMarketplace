// Để sử dụng 1 token riêng thay cho ether trong smart contract này, bạn cần chỉnh sửa một số phần của contract. Hiện tại, contract này đang sử dụng ether như là đơn vị tiền tệ để thực hiện các giao dịch.

// Đầu tiên, bạn cần tạo một smart contract mới để đại diện cho token của bạn, nơi bạn sẽ định nghĩa các hàm chức năng cần thiết để quản lý token của bạn. Một số chức năng cơ bản bao gồm tạo mới token, phân phối token, chuyển đổi token và kiểm tra số dư tài khoản.

// Sau khi bạn đã có smart contract của mình để đại diện cho token, bạn có thể chỉnh sửa các hàm trong smart contract HealthcareMarket để sử dụng token của bạn thay vì ether. Cụ thể, bạn cần thay đổi phần trong hàm buy() để trừ số lượng token tương ứng thay vì số lượng ether từ tài khoản của người mua và chuyển số lượng token tương ứng đến tài khoản của chủ sở hữu smart contract.

// Bạn cũng cần đảm bảo rằng tài khoản của mỗi người dùng có đủ token để thực hiện các giao dịch. Bạn có thể thực hiện điều này bằng cách sử dụng hàm transfer() của smart contract của bạn để chuyển token từ tài khoản của người dùng đến tài khoản của HealthcareMarket smart contract trước khi thực hiện một giao dịch.

// Sau khi bạn đã hoàn thành các bước trên, bạn có thể sử dụng token của mình để thực hiện các giao dịch trong smart contract HealthcareMarket.

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./HealthcareToken.sol";

contract HealthcareMarket is ReentrancyGuard {
    using SafeMath for uint256;

    HealthcareToken public token;

    struct Product {
        uint256 id;
        string name;
        string description;
        uint256 price;
        string imageURL;
        uint256 quantity;
        bool available;
    }

    struct Purchase {
        uint256 id;
        address buyer;
        uint256[] products;
        bool delivered;
    }

    mapping(uint256 => Product) public products;
    mapping(address => bool) public kyc;
    mapping(uint256 => Purchase) public purchases;
    mapping(address => uint256) public balances;

    uint256 public lastProductId;
    uint256 public lastPurchaseId;

    address owner;

    uint256 public transactionFeePercentage = 1; //1%

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only contract owner can call this function."
        );
        _;
    }

    modifier productExists(uint256 productId) {
        require(products[productId].available, "Product does not exist.");
        _;
    }

    event ProductAdded(
        uint256 productId,
        string name,
        string description,
        uint256 price,
        string imageURL,
        uint256 quantity
    );
    event ProductEdited(
        uint256 productId,
        string name,
        string description,
        uint256 price,
        string imageURL,
        uint256 quantity
    );
    event ProductRemoved(uint256 productId);
    event PurchaseMade(uint256 purchaseId, address buyer, uint256 totalPrice);
    event PurchaseDelivered(uint256 purchaseId);

    constructor(address tokenAddress) {
        owner = msg.sender;
        token = HealthcareToken(tokenAddress);
    }

    function validateProduct(
        string memory name,
        string memory description,
        uint256 price,
        uint256 quantity
    ) internal pure {
        require(bytes(name).length > 0, "Product name is required.");
        require(
            bytes(description).length > 0,
            "Product description is required."
        );
        require(price > 0, "Product price must be greater than zero.");
        require(quantity > 0, "Product quantity must be greater than zero.");
    }

    function addProduct(
        string memory name,
        string memory description,
        uint256 price,
        string memory imageURL,
        uint256 quantity
    ) public onlyOwner returns (uint256) {
        validateProduct(name, description, price, quantity);
        lastProductId++;
        products[lastProductId] = Product(
            lastProductId,
            name,
            description,
            price,
            imageURL,
            quantity,
            true
        );
        emit ProductAdded(
            lastProductId,
            name,
            description,
            price,
            imageURL,
            quantity
        );
        return lastProductId;
    }

    function editProduct(
        uint256 productId,
        string memory name,
        string memory description,
        uint256 price,
        string memory imageURL,
        uint256 quantity
    ) public onlyOwner productExists(productId) {
        require(products[productId].available, "Product does not exist.");
        products[productId].name = name;
        products[productId].description = description;
        products[productId].price = price;
        products[productId].imageURL = imageURL;
        products[productId].quantity = quantity;
        emit ProductEdited(
            productId,
            name,
            description,
            price,
            imageURL,
            quantity
        );
    }

    function removeProduct(
        uint256 productId
    ) public onlyOwner productExists(productId) {
        require(products[productId].available, "Product does not exist.");
        products[productId].available = false;
        emit ProductRemoved(productId);

        // Update lastProductId if the removed product was the last one
        if (productId == lastProductId) {
            lastProductId--;
        }
    }

    function buy(uint256[] memory productIds) public {
        require(
            kyc[msg.sender] || productIds.length < 100,
            "KYC required for large purchases."
        );
        require(
            productIds.length <= 100,
            "Maximum 100 products can be purchased at a time."
        );
        // Remove products that are not available or out of stock
        uint256[] memory validProductIds = new uint256[](productIds.length);
        uint256 validProductCount = 0;
        uint256 totalPrice = 0;
        for (uint256 i = 0; i < productIds.length; i++) {
            if (
                products[productIds[i]].available &&
                products[productIds[i]].quantity > 0
            ) {
                validProductIds[validProductCount] = productIds[i];
                validProductCount++;
                totalPrice = totalPrice.add(products[productIds[i]].price);
                products[productIds[i]].quantity--;
            }
        }
        require(validProductCount > 0, "No valid products to purchase.");
        // Calculate transaction fee
        uint256 transactionFee = totalPrice.mul(transactionFeePercentage).div(
            100
        );

        // Transfer tokens to owner
        require(
            token.transferFrom(msg.sender, owner, transactionFee),
            "Token transfer failed"
        );

        // Transfer products to buyer
        require(
            token.transferFrom(
                owner,
                msg.sender,
                totalPrice.sub(transactionFee)
            ),
            "Token transfer failed"
        );

        // Create purchase
        lastPurchaseId++;
        purchases[lastPurchaseId] = Purchase(
            lastPurchaseId,
            msg.sender,
            validProductIds,
            false
        );
        emit PurchaseMade(lastPurchaseId, msg.sender, totalPrice);
    }

    function withdrawBalance() public nonReentrant {
        uint256 balance = balances[msg.sender];
        require(balance > 0, "No balance to withdraw.");
        require(token.transfer(msg.sender, balance), "Token transfer failed");
        balances[msg.sender] = 0;
    }

    function deliver(uint256 purchaseId) public onlyOwner {
        require(
            purchases[purchaseId].buyer != address(0),
            "Purchase does not exist."
        );
        require(purchases[purchaseId].id != 0, "Purchase does not exist.");
        require(
            !purchases[purchaseId].delivered,
            "Purchase already delivered."
        );
        purchases[purchaseId].delivered = true;
        emit PurchaseDelivered(purchaseId);
    }

    function register() public {
        require(!kyc[msg.sender], "User already registered.");
        kyc[msg.sender] = true;
    }

    function unregister() public {
        require(kyc[msg.sender], "User not registered.");
        kyc[msg.sender] = false;
    }

    function isRegistered(address user) public view returns (bool) {
        return kyc[user];
    }

    function getPurchaseIdsByBuyer(
        address buyer
    ) public view returns (uint256[] memory) {
        uint256[] memory purchaseIds = new uint256[](lastPurchaseId);
        uint256 numPurchases = 0;
        for (uint256 i = 1; i <= lastPurchaseId; i++) {
            if (purchases[i].buyer == buyer) {
                purchaseIds[numPurchases] = purchases[i].id;
                numPurchases++;
            }
        }
        uint256[] memory result = new uint256[](numPurchases);
        for (uint256 i = 0; i < numPurchases; i++) {
            result[i] = purchaseIds[i];
        }
        return result;
    }

    function getPurchaseById(
        uint256 purchaseId
    ) public view returns (address, Product[] memory, bool) {
        require(
            purchases[purchaseId].buyer != address(0),
            "Purchase does not exist."
        );
        require(purchases[purchaseId].id != 0, "Purchase does not exist.");
        return (
            purchases[purchaseId].buyer,
            copyProductArray(purchases[purchaseId].products),
            purchases[purchaseId].delivered
        );
    }

    function copyProductArray(
        uint256[] storage array
    ) internal view returns (Product[] memory) {
        Product[] memory result = new Product[](array.length);
        for (uint256 i = 0; i < array.length; i++) {
            result[i] = products[array[i]];
        }
        return result;
    }

    function getAvailableProducts() public view returns (Product[] memory) {
        uint256 numAvailableProducts = 0;
        for (uint256 i = 1; i <= lastProductId; i++) {
            if (products[i].available) {
                numAvailableProducts++;
            }
        }
        Product[] memory availableProducts = new Product[](
            numAvailableProducts
        );
        uint256 currentProductIndex = 0;
        for (uint256 i = 1; i <= lastProductId; i++) {
            if (products[i].available) {
                availableProducts[currentProductIndex] = products[i];
                currentProductIndex++;
            }
        }
        return availableProducts;
    }
}
