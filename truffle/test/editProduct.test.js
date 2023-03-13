const HealthcareMarket = artifacts.require("HealthcareMarket");
const { expectRevert } = require('@openzeppelin/test-helpers');

contract("HealthcareMarket", (accounts) => {
  const owner = accounts[0];
  const buyer = accounts[1];

  let healthcareMarket;

  before(async () => {
    healthcareMarket = await HealthcareMarket.new({ from: owner });
  });

  it("should edit product correctly", async () => {
    // Add a product to the contract
    await healthcareMarket.addProduct("Product 1", "Description", imageURL, 100, 10, { from: owner });

    // Get the product ID
    const productId = 1;
    const imageURL = "https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w="

    await expectRevert(
      healthcareMarket.editProduct(productId, "Product 1 Updated", "Description Updated", imageURL, 200, 5, { from: buyer }),
      "Only contract owner can call this function."
    );
    
    // Edit the product
    await healthcareMarket.editProduct(productId, "Product 1 Updated", "Description Updated", imageURL, 200, 5, { from: owner });

    // Get the updated product
    const product = await healthcareMarket.products(productId);

    // Check that the product was updated correctly
    assert.equal(product.name, "Product 1 Updated", "Product name was not updated correctly");
    assert.equal(product.description, "Description Updated", "Product description was not updated correctly");
    assert.equal(product, imageURL, "https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=");
    assert.equal(product.price, 200, "Product price was not updated correctly");
    assert.equal(product.quantity, 5, "Product quantity was not updated correctly");
  });
  
});
