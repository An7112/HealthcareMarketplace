// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./HealthcareToken.sol";

contract HealthcareMarket is ReentrancyGuard {
    using SafeMath for uint256;

    HealthcareToken public token;

    receive() external payable {}

    struct Product {
        uint256 id;
        string name;
        string description;
        uint256 price;
        string imageURL;
        uint256 quantity;
        bool available;
    }

    enum PurchaseStatus {
        Preparing,
        Shipping,
        Delivered
    }

    struct Purchase {
        string buyer;
        uint256 id;
        string name;
        string description;
        uint256 price;
        string imageURL;
        uint256 qtyPurchase;
        bool unavailable;
        PurchaseStatus status;
    }

    mapping(address => mapping(uint256 => uint256)) public cart;
    mapping(uint256 => Product) public products;
    mapping(address => bool) public kyc;
    mapping(uint256 => Purchase) public purchases;
    mapping(address => uint256) public balances;

    uint256 public lastProductId;
    uint256 public lastPurchaseId;
    uint256[] public allProductIds;

    address private owner;

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
    event PurchaseMade(
        string buyer,
        uint256 purchaseId,
        string name,
        string description,
        uint256 price,
        string imageURL,
        uint256 qtyPurchase
    );
    event PurchaseDelivered(uint256 purchaseId);
    event ProductAddedToCart(
        address buyer,
        uint256 productId,
        uint256 quantity
    );

    constructor(address tokenAddress) {
        owner = msg.sender;
        token = HealthcareToken(tokenAddress);
    }

    function getOwnerAddress() public view returns (address) {
        return owner;
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
        uint256 existingProductId = 0;
        for (uint256 i = 1; i <= lastProductId; i++) {
            if (
                keccak256(bytes(products[i].name)) == keccak256(bytes(name)) &&
                products[i].available
            ) {
                existingProductId = i;
                break;
            }
        }
        if (existingProductId > 0) {
            products[existingProductId].quantity = products[existingProductId]
                .quantity
                .add(quantity);
            emit ProductAdded(
                existingProductId,
                name,
                description,
                price,
                imageURL,
                products[existingProductId].quantity
            );
            return existingProductId;
        } else {
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

    function buy(
        uint256[] memory productIds,
        uint256[] memory quantities,
        string memory buyer
    ) public nonReentrant {
        require(productIds.length == quantities.length, "Invalid input.");

        uint256 totalAmount = 0;
        for (uint256 i = 0; i < productIds.length; i++) {
            uint256 productId = productIds[i];
            uint256 quantity = quantities[i];

            Product storage product = products[productId];
            require(product.available, "Product does not exist.");
            require(product.quantity >= quantity, "Product is out of stock.");

            uint256 price = product.price * quantity * 10 ** 18;
            totalAmount = totalAmount.add(price);

            product.quantity = product.quantity.sub(quantity);

            if (
                keccak256(bytes(purchases[productId].buyer)) !=
                keccak256(bytes(buyer))
            ) {
                purchases[productId] = Purchase(
                    buyer,
                    productId,
                    product.name,
                    product.description,
                    product.price,
                    product.imageURL,
                    quantity,
                    true,
                    PurchaseStatus.Preparing
                );
            } else {
                purchases[productId].qtyPurchase = purchases[productId]
                    .qtyPurchase
                    .add(quantity);
            }

            emit PurchaseMade(
                buyer,
                ++lastPurchaseId,
                product.name,
                product.description,
                product.price,
                product.imageURL,
                quantity
            );
        }

        // Approve token transfer from buyer to HealthcareMarket
        token.approve(address(this), totalAmount);
        // Transfer tokens from buyer to HealthcareMarket
        token.transferFrom(msg.sender, address(this), totalAmount);
        // Transfer tokens from HealthcareMarket to owner
        token.transfer(owner, totalAmount);
    }

    function withdrawBalance() public nonReentrant {
        uint256 balance = balances[msg.sender];
        require(balance > 0, "No balance to withdraw.");
        require(token.transfer(msg.sender, balance), "Token transfer failed");
        balances[msg.sender] = 0;
    }

    function deliver(uint256 purchaseId) public onlyOwner {
        Purchase storage purchase = purchases[purchaseId];
        purchase.status = PurchaseStatus.Shipping; // set status to Shipping
        emit PurchaseDelivered(purchaseId);
    }

    function confirmDelivery(uint256 purchaseId) public {
        Purchase storage purchase = purchases[purchaseId];
        require(
            purchase.status == PurchaseStatus.Shipping,
            "Purchase is not in shipping status."
        );
        purchase.status = PurchaseStatus.Delivered; // set status to Delivered
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

    function getAllPurchasedProducts(
        uint256 startIndex,
        uint256 endIndex,
        string memory buyer
    ) public view returns (Purchase[] memory) {
        require(
            startIndex <= endIndex,
            "Invalid start and end indices."
        );
        uint256 numAvailablePurchased = 0;
        for (uint256 i = startIndex; i <= endIndex; i++) {
            if (
                purchases[i].unavailable &&
                keccak256(bytes(purchases[i].buyer)) == keccak256(bytes(buyer))
            ) {
                numAvailablePurchased++;
            }
        }

        Purchase[] memory allPurchases = new Purchase[](numAvailablePurchased);

        uint256 currentPurchasedIndex = 0;

        for (uint256 i = startIndex; i <= endIndex; i++) {
            if (
                purchases[i].unavailable &&
                keccak256(bytes(purchases[i].buyer)) == keccak256(bytes(buyer))
            ) {
                allPurchases[currentPurchasedIndex] = purchases[i];
                currentPurchasedIndex++;
            }
        }
        return allPurchases;
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

    function getAvailableProducts(
        uint256 start,
        uint256 end
    ) public view returns (Product[] memory) {
        require(
            start <= end && end <= lastProductId,
            "Invalid start and end indices."
        );

        uint256 numAvailableProducts = 0;
        for (uint256 i = start; i <= end; i++) {
            if (products[i].available) {
                numAvailableProducts++;
            }
        }

        Product[] memory availableProducts = new Product[](
            numAvailableProducts
        );
        uint256 currentProductIndex = 0;

        for (uint256 i = start; i <= end; i++) {
            if (products[i].available) {
                availableProducts[currentProductIndex] = products[i];
                currentProductIndex++;
            }
        }

        return availableProducts;
    }

    //lấy danh sách tất cả các ID sản phẩm đang có sẵn
    function getAllProductIds() public view returns (uint256[] memory) {
        return allProductIds;
    }

    //Tìm kiếm sản phẩm dựa trên tên
    function searchProductsByName(
        string memory name
    ) public view returns (uint256[] memory) {
        uint256[] memory results = new uint256[](lastProductId);
        uint256 count = 0;
        for (uint256 i = 1; i <= lastProductId; i++) {
            if (
                products[i].available &&
                keccak256(bytes(products[i].name)) == keccak256(bytes(name))
            ) {
                results[count] = i;
                count++;
            }
        }
        return results;
    }
}
