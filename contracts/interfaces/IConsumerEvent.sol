// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IConsumerEvent {
   function buyTicket (address eventContractAddress, string memory _ticketName) external payable returns (uint256);
}
