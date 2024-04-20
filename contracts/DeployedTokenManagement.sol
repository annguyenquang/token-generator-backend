// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DeployedTokenManagement {
    mapping(address => mapping(uint256 => address)) public ownership;
    mapping(address => uint256) public tokenCount;

    function addToken (address smcAddress) public {

        uint256 index = tokenCount[msg.sender]++;
        ownership[msg.sender][index] = smcAddress;
    }

    function checkIfTokenOwner(address smcAddress) onlyTokenOwner(smcAddress) public view returns(bool) {
        return true;
    }

    modifier onlyTokenOwner (address smcAddress) {
        bool isOwner = false;
        for(uint256 i = 0; i < tokenCount[msg.sender]; i++) {
            if(ownership[msg.sender][i] == smcAddress) {
                isOwner = true;
            }
        }

        if(!isOwner){
            revert();
        }

        _;
    }
}