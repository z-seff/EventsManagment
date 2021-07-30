const { assert } = require("chai");

const PriceConsumerV3 = artifacts.require("PriceConsumerV3");
const EventsManagment = artifacts.require("EventsManagment");
const ConsumerEvent = artifacts.require("ConsumerEvent");
const ERC721 = artifacts.require("ERC721");

// contract ("PriceConsumerV3", accounts => {
//   console.log(accounts);
//
//   it ("1. Get the correct price feed address", async () => {
//       var priceConsumer = await PriceConsumerV3.deployed();
//       const price = await priceConsumer.priceFeed.call();
//       console.log(price);
//   })
// })

contract ("EventsManagment", accounts => {
    it ("1. Update Usd to Uah Rate", async () => {
        const eventsManagment = await EventsManagment.deployed();
        var rate = await eventsManagment.updateUsdinUahRate(28);
        console.log(rate);
    })

    it ("2. Create New Event", async () => {
        const eventsManagment = await EventsManagment.deployed();
        await eventsManagment.createEvent("0xff", "MoneyOfTheFuture", "MoneyOfTheFutureEvent", "25.09-30.09", "Ukraine", "true", "MoneyOfTheFuture Collection", "MoneyOfTheFuture symbol", "https://");
        var test = eventsManagment.

        // var name = eventsManagment.getEventName(address.this);
        // var description = eventsManagment.getEventDescription(eventsManagment);
        // var dates = eventsManagment.getEventDates(eventsManagment);
        // var place = eventsManagment.getEventPlace(eventsManagment);
        //
        // assert.equal(name, "MoneyOfTheFuture", "Not correct Event name");
        // assert.equal(description, "MoneyOfTheFutureEvent", "Not correct Event description");
        // assert.equal(dates, "25.09-30.09", "Not correct Event dates");
        // assert.equal(place, "Ukraine", "Not correct Event place");
    })



})

// contract ("ERC721", accounts => {
//
// })
//
// contract ("ConsumerEvent", accounts => {
//
// })
//

//
// contract("Voting", accounts => {
//     console.log(accounts);
//
//     it("1. Check tokens mint total supply", async () => {
//         var token = await VoteToken.deployed();
//         var balance = await token.balanceOf(accounts[0]);
//         const name = await token.name();
//         console.log('Tokens balance', balance.toNumber())
//         assert.equal(balance.toNumber(), 1000, "Not correct total supply")
//         assert.equal(name, "VoteToken", "Not corrent name")
//     })
//
//     it("2. Transfer VoteToken to another account", async () => {
//         const token = await VoteToken.deployed();
//         await token.transfer(accounts[1], 100);
//         const balance_account1 = await token.balanceOf(accounts[1])
//         assert.equal(balance_account1, 100, "Not correct amount accounts 1");
//     })
//
//     it("3. Voting add political party", async () => {
//         const voting = await Voting.deployed();
//         await voting.addPoliticalParty("Solidity developers", { from: accounts[0] });
//         const partyId = await voting.politicalParty_id.call();
//         assert.equal(partyId.toNumber(), 1, "ID of party is not correct!!!")
//     })
//
//     it("4. Add candidate", async () => {
//         const voting = await Voting.deployed();
//         await voting.addCandidate("Candidat1", 1)
//         const candidate = await voting.Candidates(1);
//         assert.equal(candidate.candidateName, "Candidat1", "Not correct name of candidate")
//     })
//
//     it("5. Set VoteToken address", async () => {
//         const voting = await Voting.deployed();
//         const token = await VoteToken.deployed();
//
//         await voting.setVoteTokenAddress(token.address);
//         const vote_token_address = await voting.vote_token_address.call();
//
//         assert.equal(vote_token_address, token.address, "Token address is not correct")
//         console.log('Vote token address:', vote_token_address);
//     })
//
//     it("6. Set transport token address", async () => {
//         const voting = await Voting.deployed();
//         const transport_token_instance = await TransportToken.deployed();
//         await voting.setTransportTokenAddress(transport_token_instance.address);
//         const token_address = await voting.transport_token_address.call();
//         assert.equal(token_address, transport_token_instance.address, "Token address is not correct")
//         console.log('Transport token address:', token_address);
//     })
//
//     it("7. Add tokens to Transport Smart Contract", async () => {
//         const transport_token = await TransportToken.deployed();
//         const voting_contract = await Voting.deployed();
//         await transport_token.transfer(voting_contract.address, 100);
//         const balance_transport_contract = await transport_token.balanceOf(voting_contract.address);
//         assert.equal(balance_transport_contract, 100, "Not correct balance transport token!")
//     })
//
//     it("8. Check registration function", async () => {
//         const voting = await Voting.deployed();
//         const token_reg = await VoteToken.deployed();
//         const nftpassport_instance = await NFTPassport.deployed();
//
//         await token_reg.transfer(voting.address, 100) // for smart contract
//         await voting.registrationVoter({ from: accounts[2], value: "1000000000000000000" })
//         const token_balance = await token_reg.balanceOf(accounts[2])
//         const token_balance_contract = await token_reg.balanceOf(voting.address)
//         const balance_ethers = await web3.eth.getBalance(voting.address)
//
//         assert.equal(token_balance.toNumber(), 10, "Not correct token balance")
//         assert.equal(balance_ethers, "1000000000000000000", "Not crrect contract balance")
//         assert.equal(token_balance_contract.toNumber(), 90, "Not correct balance")
//     })
//
//     it("9. Token approve for smart contract", async () => {
//         const token = await VoteToken.deployed();
//         const voting = await Voting.deployed();
//         await token.approve(voting.address, 10, { from: accounts[2] })
//     })
//
//     it("10. Voting process", async () => {
//         const token = await VoteToken.deployed();
//         const voting = await Voting.deployed();
//
//         await voting.VotingProcess(1, { from: accounts[2] })
//         const token_balance_smart = await token.balanceOf(voting.address)
//
//         assert.equal(token_balance_smart.toNumber(), 100, "Not correct balance after transfer")
//         const token_balance_account = await token.balanceOf(accounts[2])
//         assert.equal(token_balance_account.toNumber(), 0, "Not correct balance after transfer")
//     })
//
//     it("11. Set voting contract address in transport contract", async () => {
//         const voting = await Voting.deployed();
//         const transport_contract = await TransportCity.deployed();
//
//         await transport_contract.setVotingContractAddress(voting.address);
//         const voting_contract_address = await transport_contract.voting_contract_address.call()
//         assert.equal(voting_contract_address, voting.address, "Not correct voting address in transport contract")
//     })
//
//     it("12. Set voting contract address in transport contract", async () => {
//         const voting = await Voting.deployed();
//         const transport_contract = await TransportCity.deployed();
//         await transport_contract.setVotingContractAddress(voting.address);
//         const voting_contract_address = await transport_contract.voting_contract_address.call()
//         assert.equal(voting_contract_address, voting.address, "Not correct voting address in transport contract")
//     })
//
//     it("13. Approve token transfer for transport tokens", async () => {
//         const transport_contract = await TransportCity.deployed();
//         const transport_token = await TransportToken.deployed();
//         await transport_token.approve(transport_contract.address, 10, { from: accounts[2] })
//     })
//
//     it("14. Transfer tokens to transport contract", async () => {
//         const transport_contract = await TransportCity.deployed();
//         await transport_contract.getPayment(10, { from: accounts[2] });
//         const transport_token = await TransportToken.deployed();
//         const customer_balance = await transport_token.balanceOf(accounts[2]);
//         assert.equal(customer_balance, 0, "Not correct customer balance")
//     })
//
//     it("15. Transfer transport tokens to test user-3", async () => {
//         const transport_token = await TransportToken.deployed();
//         await transport_token.transfer(accounts[3], 10);
//         const check_transfer_to_accounts3 = await transport_token.balanceOf(accounts[3]);
//         assert.equal(check_transfer_to_accounts3, 10, "Not correct transfer to account 3")
//     })
//
//     it("16. Transfer tokens to transport contract from accounts 3 (without voting)", async () => {
//         const transport_contract = await TransportCity.deployed();
//         await transport_contract.getPayment(10, { from: accounts[3] });
//         const transport_token = await TransportToken.deployed();
//         const customer_balance = await transport_token.balanceOf(accounts[3]);
//         assert.equal(customer_balance, 10, "Not correct customer balance")
//     })
//
//     it("17. Check NFTPassport name and NFTPassport symbol", async () => {
//         const voting = await Voting.deployed();
//         const nftpassport = await NFTPassport.deployed();
//
//         const nftpassport_name = await nftpassport.name();
//         assert.equal('NFTPassport', 'NFTPassport', 'Not correct name');
//
//         const nftpassport_symbol = await nftpassport.symbol();
//         assert.equal('NFP', 'NFP', 'Not correct symbol')
//
//     })
//
//     it("18. Set NFTPassport token address", async () => {
//         const voting = await Voting.deployed();
//         const nftpassport = await NFTPassport.deployed();
//
//         await voting.setNFTPassportTokenAddress(nftpassport.address);
//         const token_address = await voting.nftpassport_token_address.call();
//         assert.equal(token_address, nftpassport.address, "NFTPassport address is not correct")
//         console.log("NFT passport token address:", token_address);
//     })
//
//
//
//     // it("18. Check random function", async () => {
//     //     const voting = await Voting.deployed();
//     //     const recieve_random_number = await voting.random();
//     //     console.log(recieve_random_number);
//     // })
//
//
// })
