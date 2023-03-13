const { expect } = require("chai");
const HealthcareMarket = artifacts.require("HealthcareMarket");

contract("HealthcareMarket", async () => {
  const owner = '0x33213df7d9F8ef565448e52fca733AdA61060e8D'
  it("should add a product", async () => {
    const healthcareMarketInstance = await HealthcareMarket.deployed();
    await healthcareMarketInstance.addProduct("Test Product", "This is a test product", 10, 50, { from: owner });
    const product = await healthcareMarketInstance.products(1);
    assert.equal(product.name, "Test Product");
    assert.equal(product.description, "This is a test product");
    assert.equal(product.price, 10);
    assert.equal(product, imageURL, "https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=");
    assert.equal(product.quantity, 50);
    assert.equal(product.available, true);
  });
})
