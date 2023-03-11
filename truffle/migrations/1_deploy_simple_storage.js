const HealthcareMarket = artifacts.require("HealthcareMarket");

module.exports = function (deployer) {
  deployer.deploy(HealthcareMarket);
};
