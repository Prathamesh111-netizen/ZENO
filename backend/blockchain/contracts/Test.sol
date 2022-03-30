// SPDX-License-Identifier: MIT
pragma solidity 0.5.0;

contract test{
    uint public a = 0;
    function get() public pure returns(string memory ){
        return "Blockchain Connection succesful";
    }
    function set() public{
        a++;
    }
}