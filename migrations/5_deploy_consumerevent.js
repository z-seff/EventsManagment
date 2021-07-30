const ConsumerEvent = artifacts.require("ConsumerEvent");

module.exports = function (deployer, accounts) {
  console.log(accounts);
  deployer.deploy(ConsumerEvent, "0xF8EA3F64e2Ca247B06B585fBc585B1fab52C95C9", "0x38fadf3F560B64DC81380fd86524782BA499200D");
};
