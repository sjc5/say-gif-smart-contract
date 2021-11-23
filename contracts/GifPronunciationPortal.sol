// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract GifPronunciationPortal {
  uint256 softTotal;
  uint256 hardTotal;

  event NewVote(address indexed from, string name, string vote, uint256 timestamp);

  struct Vote {
    address voter;
    string name;
    string vote;
    uint256 timestamp;
  }

  Vote[] votes;

  constructor() {
    console.log("This is a smart contract for voting on whether 'GIF' is pronounced with a hard or a soft G\n");
  }

  function castSoftVote(string memory _name) public {
    softTotal +=1;

    console.log("%s thinks GIF is pronounced with a soft G (as in giraffe\n)", _name);

    votes.push(Vote(msg.sender, _name, "soft", block.timestamp));

    emit NewVote(msg.sender, _name, "soft", block.timestamp);
  }

  function castHardVote(string memory _name) public {
    hardTotal +=1;

    console.log("%s thinks GIF is pronounced with a hard G (as in gorilla\n)", _name);

    votes.push(Vote(msg.sender, _name, "hard", block.timestamp));

        emit NewVote(msg.sender, _name, "hard", block.timestamp);

  }

  function getAllVotes() public view returns (Vote[] memory) {
    return votes;
  }

  function getSoftTotal() public view returns (uint256) {
    console.log("we have %d total soft G votes\n", softTotal);

    return softTotal;
  }

  function getHardTotal() public view returns (uint256) {
    console.log("we have %d total hard G votes\n", hardTotal);

    return hardTotal;
  }
}