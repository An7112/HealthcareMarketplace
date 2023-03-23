const HealthcareToken = artifacts.require("HealthcareToken");
const HealthcareMarket = artifacts.require("HealthcareMarket");

module.exports = async function (deployer) {
  await deployer.deploy(HealthcareToken);
  const token = await HealthcareToken.deployed();
  await deployer.deploy(HealthcareMarket, token.address);
};
