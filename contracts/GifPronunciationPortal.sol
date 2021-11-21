// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract GifPronunciationPortal {
  uint256 softTotal;
  uint256 hardTotal;

  constructor() {
    console.log("This is a smart contract for voting on whether 'GIF' is pronounced with a hard or a soft G\n");
  }

  function castSoftVote() public {
    softTotal +=1;

    console.log("%s thinks GIF is pronounced with a soft G (as in giraffe\n)", msg.sender);
  }

  function castHardVote() public {
    hardTotal +=1;

    console.log("%s thinks GIF is pronounced with a hard G (as in girlfriend\n)", msg.sender);
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