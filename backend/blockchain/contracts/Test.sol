// SPDX-License-Identifier: MIT
pragma solidity 0.5.0;

contract test{
    uint public a = 10;
    function get() public view returns(uint ){
        return a;
    }
}