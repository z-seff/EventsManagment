// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IEventsManagment {
    function getPrice(address _eventContractAddress, string memory _ticketName) external returns (int);

    function getEventName (address _eventContractAddress) external view returns (string memory);

    function getEventDescription (address _eventContractAddress) external view returns (string memory);

    function getEventDates (address _eventContractAddress) external view returns (string memory);

    function getEventPlace (address _eventContractAddress) external view returns (string memory);

    /* function getNftCollectionAddress (address _eventContractAddress) external view returns (address);

    function getEventStatus (address _eventContractAddress) external view returns (bool); */
}
