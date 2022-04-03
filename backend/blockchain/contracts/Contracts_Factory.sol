// SPDX-License-Identifier: MIT
pragma solidity 0.5.0;
import "./Manufacturer.sol";

contract Contracts_Factory{

    int _manufacturer_SIZE = 0;
    Manufacturer[] _manufacturers;

    function createManufacturer() public {
        Manufacturer newManufacturer = new Manufacturer();
        _manufacturers.push(newManufacturer);
        _manufacturer_SIZE++;
    }

    function allManufacturers() public view returns (Manufacturer[] memory){
        return _manufacturers;
    }

    function get_manufacturer_SIZE() public view returns (int){
        return _manufacturer_SIZE;
    }
}