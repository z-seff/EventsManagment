// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./ConsumerEvent.sol";
import "./EventsManagment.sol";
import "./interfaces/IConsumerEvent.sol";
import "./interfaces/IEventsManagment.sol";

contract ConsumerEvent is Ownable, IConsumerEvent {
    /* using Counters for Counters.Counter; */
    uint256 private tokenId;
    address public ManagmentAddress;
    address public nftCollection;

    constructor (address _ManagmentAddress, address _nftCollection) {
      ManagmentAddress = _ManagmentAddress;
      nftCollection = _nftCollection;
    }

    function updateEvnetsManagmentAddress (address _ManagmentAddress) public {
      ManagmentAddress = _ManagmentAddress;
    }

    function updateNftCollectionAddress (address _nftCollection) public {
      nftCollection = _nftCollection;
    }

    function buyTicket (address _eventContractAddress, string memory _ticketName) public override payable returns (uint256) {
      int price = IEventsManagment(ManagmentAddress).getPrice(_eventContractAddress, _ticketName);

      require(msg.sender != address(0), "Address cannot be empty");
      require(int(msg.value) == price, "Amount is not correct");

      tokenId++;
      IERC721(nftCollection).mint(_msgSender(), tokenId);
      return tokenId;
    }
}
