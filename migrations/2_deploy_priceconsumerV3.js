const PriceConsumerV3 = artifacts.require("PriceConsumerV3");

module.exports = function (deployer, accounts) {
    console.log(accounts);
  deployer.deploy(PriceConsumerV3);
};
