const ERC721 = artifacts.require("ERC721");

module.exports = function (deployer, accounts) {
    console.log(accounts);
  deployer.deploy(ERC721, "MoneyOfTheFuture", "MOTF", "https://");
};
