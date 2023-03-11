const { expect } = require("chai");
const HealthcareMarket = artifacts.require("HealthcareMarket");

contract("HealthcareMarket", async (accounts) => {
  it("should add a product", async () => {
    const healthcareMarketInstance = await HealthcareMarket.deployed();
    await healthcareMarketInstance.addProduct("Test Product", "This is a test product", 10, 50, { from: '0x742990c29fE64d1b8b79D54C2e81a291bC841025' });
    const product = await healthcareMarketInstance.products(1);
    assert.equal(product.name, "Test Product");
    assert.equal(product.description, "This is a test product");
    assert.equal(product.price, 10);
    assert.equal(product.quantity, 50);
    assert.equal(product.available, true);
  });
})
