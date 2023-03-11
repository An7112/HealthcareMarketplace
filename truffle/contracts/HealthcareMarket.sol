// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract HealthcareMarket is ReentrancyGuard {

    using SafeMath for uint256;

    struct Product {
        uint256 id;
        string name;
        string description;
        uint256 price;
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
        uint256 quantity
    );
    event ProductEdited(
        uint256 productId,
        string name,
        string description,
        uint256 price,
        uint256 quantity
    );
    event ProductRemoved(uint256 productId);
    event PurchaseMade(uint256 purchaseId, address buyer, uint256 totalPrice);
    event PurchaseDelivered(uint256 purchaseId);

    constructor() {
        owner = msg.sender;
    }

    //Kiểm tra tính hợp lệ của các tham số truyền vào trước khi được addProduct
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
        uint256 quantity
    ) public onlyOwner returns (uint256) {
        validateProduct(name, description, price, quantity);
        lastProductId++;
        products[lastProductId] = Product(
            lastProductId,
            name,
            description,
            price,
            quantity,
            true
        );
        emit ProductAdded(lastProductId, name, description, price, quantity);
        return lastProductId;
    }

    function editProduct(
        uint256 productId,
        string memory name,
        string memory description,
        uint256 price,
        uint256 quantity
    ) public onlyOwner productExists(productId) {
        require(products[productId].available, "Product does not exist.");
        products[productId].name = name;
        products[productId].description = description;
        products[productId].price = price;
        products[productId].quantity = quantity;
        emit ProductEdited(productId, name, description, price, quantity);
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

    function buy(uint256[] memory productIds) public payable {
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
        uint256 transactionFee = totalPrice.mul(transactionFeePercentage).div(100);

        // Transfer funds to owner
        balances[owner] = balances[owner].add(transactionFee);
        balances[msg.sender] = balances[msg.sender].add(
            totalPrice.sub(transactionFee)
        );

        // Create purchase record
        lastPurchaseId++;
        purchases[lastPurchaseId] = Purchase(
            lastPurchaseId,
            msg.sender,
            validProductIds,
            false
        );
        emit PurchaseMade(lastPurchaseId, msg.sender, totalPrice);
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
