// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./interfaces/IEventsManagment.sol";
import "./PriceConsumerV3.sol";
import "./ConsumerEvent.sol";

contract EventsManagment is IEventsManagment, Ownable {

    int private priceUsdinUahRate = 27;
    address public priceConsumerV3Address;

    struct eventDetails {
        string eventName; // The name of event;
        string eventDescription; // The description of event;
        string eventDates; // Event dates;
        string eventPlace; // Event place;
        bool eventStatus; // Active - 1; Not active - 0;
        address nftCollectionAddress;
    }

    struct ticketDetails {
        uint8 ticketIndex;
        string ticketName;
        int ticketPrice;
        uint8 ticketAmount;
    }

     // Information about all events;
    mapping (address => eventDetails) private Events;

     // Information about all tickets within event;
    mapping (address => ticketDetails[]) private Tickets;

    // function to update USD to UAH rate
    function updateUsdinUahRate (int _priceUsdinUahRate) onlyOwner public returns (int) {
      priceUsdinUahRate = _priceUsdinUahRate;
      return priceUsdinUahRate;
    }

    // function to create new event

    function createEvent (
        bytes32 salt,
        // uint arg,
        string memory _eventName,
        string memory _eventDescription,
        string memory _eventDates,
        string memory _eventPlace,
        bool _eventStatus,
        string memory name,
        string memory symbol,
        string memory baseTokenURI) onlyOwner public {
            // Generate contract addresses via "new" statement

            ERC721 _nftCollectionAddress = new ERC721 {salt: salt} (name,symbol,baseTokenURI);
            ConsumerEvent eventContractAddress = new ConsumerEvent {salt: salt}(address(this), address(_nftCollectionAddress));
            PriceConsumerV3 priceConsumerV3AddressInstance = new PriceConsumerV3 {salt: salt}();
            priceConsumerV3Address = address(priceConsumerV3AddressInstance);

            Events[address(eventContractAddress)].eventName = _eventName;
            Events[address(eventContractAddress)].eventDescription = _eventDescription;
            Events[address(eventContractAddress)].eventDates = _eventDates;
            Events[address(eventContractAddress)].eventPlace = _eventPlace;
            Events[address(eventContractAddress)].eventStatus = _eventStatus;
            Events[address(eventContractAddress)].nftCollectionAddress = address(_nftCollectionAddress);
        }

    // activate o deactivate certain event. Active - 1; Not active - 0;
    function changeEventStatus (address eventContractAddress, bool _eventStatus) onlyOwner public {
        Events[eventContractAddress].eventStatus = _eventStatus;
    }

    // function to add new ticket to certain event.
    // @ticketArray: [[0,"StandardTicket", 1500, 50] [1,"Afetrparty", 1750, 30] [2, "VipTicket", 3000, 20]]
    function addTickets (address _eventContractAddress, ticketDetails[] calldata ticketArray) onlyOwner public {
      for (uint8 i = 0; i < ticketArray.length; i++) {
        Tickets[_eventContractAddress][i].ticketIndex = i;
        Tickets[_eventContractAddress][i].ticketName = ticketArray[i].ticketName;
        Tickets[_eventContractAddress][i].ticketPrice = ticketArray[i].ticketPrice;
        Tickets[_eventContractAddress][i].ticketAmount = ticketArray[i].ticketAmount;
      }
    }

    function loop (address _eventContractAddress,string memory _ticketName) internal view returns (uint8) {
        uint8 j = 0;
        while (keccak256(abi.encodePacked(Tickets[_eventContractAddress][j].ticketName)) != keccak256(abi.encodePacked(_ticketName))) {j++;} return j;
    }

    function getPrice(address _eventContractAddress, string memory _ticketName) public view override returns (int) {
        int priceEthInUSD = PriceConsumerV3(priceConsumerV3Address).getThePrice();
        int priceEthInUAH = priceEthInUSD * priceUsdinUahRate;
        uint8 index = loop(_eventContractAddress,_ticketName);
        int price = Tickets[_eventContractAddress][index].ticketPrice / priceEthInUAH;
        return price;
    }

    // Metadata functions

    /* function getNftCollectionAddress (address _eventContractAddress) public override view returns (address) {
      return Events[_eventContractAddress].nftCollectionAddress;
    }

    function getEventStatus (address _eventContractAddress) public override view returns (bool) {
      return Events[_eventContractAddress].eventStatus;
    } */

    function getEventName (address _eventContractAddress) public override view returns (string memory) {
      return Events[_eventContractAddress].eventName;
    }

    function getEventDescription (address _eventContractAddress) public override view returns (string memory) {
      return Events[_eventContractAddress].eventDescription;
    }

    function getEventDates (address _eventContractAddress) public override view returns (string memory) {
      return Events[_eventContractAddress].eventDates;
    }

    function getEventPlace (address _eventContractAddress) public override view returns (string memory) {
      return Events[_eventContractAddress].eventPlace;
    }

}
