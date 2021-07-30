const EventsManagment = artifacts.require("EventsManagment");

module.exports = function (deployer, accounts) {
    console.log(accounts);
  deployer.deploy(EventsManagment);
};
