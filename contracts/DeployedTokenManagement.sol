// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DeployedTokenManagement {
    mapping(address => mapping(uint256 => address)) public ownership;
    mapping(address => uint256) public tokenCount;

    function addToken(address smcAddress) public {
        uint256 index = tokenCount[msg.sender]++;
        ownership[msg.sender][index] = smcAddress;
    }

    function getTokenList(
        address owner
    ) public view returns (address[] memory) {
        require(
            tokenCount[owner] > 0,
            "This address have not deploy any token!"
        );
        address[] memory list = new address[](tokenCount[owner]);
        for (uint256 i = 0; i < tokenCount[owner]; i++) {
            list[i] = ownership[owner][i];
        }
        return list;
    }

    function checkIfTokenOwner(
        address smcAddress
    ) public view onlyTokenOwner(smcAddress) returns (bool) {
        return true;
    }

    modifier onlyTokenOwner(address smcAddress) {
        bool isOwner = false;
        for (uint256 i = 0; i < tokenCount[msg.sender]; i++) {
            if (ownership[msg.sender][i] == smcAddress) {
                isOwner = true;
            }
        }

        if (!isOwner) {
            revert();
        }

        _;
    }
}
