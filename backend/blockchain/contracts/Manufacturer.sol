// SPDX-License-Identifier: MIT
pragma solidity 0.5.0;
pragma experimental ABIEncoderV2;

contract Manufacturer{

    //ethers receive and sent section
    function() external payable{}

    function getAddress()  public view returns (address){
        return address(this);
    }

    function fundtransfer(address payable etherreceiver, uint256 amount) public payable {
        etherreceiver.transfer(amount);
    }

    int public material = 0;
    constructor() public payable{}

    // General method to call : when manufacturer produces raw material
    function produce() public returns(int){
        // _transaction_entry("New Stock added", material, material + _material, now);
        // material = material + _material;
        material = material + 10 ;
        return material;
    }

    // General method to call : to consume material
    function sell(int _material) public returns(string memory) {

        if (material >= _material){
            _transaction_entry("Stock spent", material, material - _material, now);
            material = material - _material;
            return "Successfully sell / requirement filled";
        }
        else{
            _transaction_entry("Stock spent", material, 0, now);
            material = 0;
            return "Successfully sell remaining/ under requirement" ;
        }
    }

    // General method to call : to check available stock
    function available() public view returns (int){
        return material;
    }

    



    // database section
    struct manufacturer_logs {
        string transaction_detail;
        int prev_stock;
        int new_stock;
        uint256 timestamp;
    }

    manufacturer_logs[] public logs;

    function _transaction_entry(string memory _transaction_detail ,
                            int _prev_stock,
                            int _new_stock, 
                            uint256 _timestamp) public {

        manufacturer_logs memory newlog;
        newlog.transaction_detail = _transaction_detail;
        newlog.prev_stock = _prev_stock;
        newlog.new_stock = _new_stock;
        newlog.timestamp = _timestamp;
        logs.push(newlog);       
    }
    
    function _transaction_logs() public view returns (manufacturer_logs[] memory) {
        return logs;      
    }

} 

