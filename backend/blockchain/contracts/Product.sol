// SPDX-License-Identifier: MIT
pragma solidity 0.5.0;
// pragma experimental ABIEncoderV2;

contract Product{

    string Retailer;

    constructor(string memory _owner) public payable{
       Retailer =  _owner ;
    }
    //ethers receive and sent section
    function() external payable{}

    function getAddress()  public view returns (address){
        return address(this);
    }

    function getRetailer() public view returns (string memory){
        return Retailer;
    }


    // basic stages in product
    uint public index = 0;
    string[] public stages = [
        "Ideation Stage",
        "Requested for Raw Materials, In Progress",
        "All Raw Materials Requests fulfilled",
        "All Raw Materials are with DIstributor",
        "All Raw Materials processing to make product",
        "Product is Ready",
        "Product is bought by customer"
    ];

    function incrementStage() public {
        index++;
    }

    function getProductStage() public view returns(string memory){
        return stages[index];
    }

    

    // Applications
    
    string[] Materials;
    uint material_SIZE = 0;

    struct Request{
        string currentOwner;
        uint Capacity;
        uint Price;
    }

    mapping(string => Request) requests;
    mapping(string => bool) requestStatus;

    function setRequests(string memory _material,  uint _capacity, uint _price) public {
        requestStatus[_material] = false;
        
        Request memory temp;
        temp.Capacity = _capacity;
        temp.currentOwner = Retailer;
        temp.Price = _price;
        requests[_material] = temp;
    }

    function acceptRequest(string memory _material, string memory _manufacturer) public{
        requests[_material].currentOwner = _manufacturer;
    }

    function fulfillRequest(string memory _material) public {
         requestStatus[_material] = true;
    }

    function checkallRequests() public view returns(bool){
        bool flag = true;
        for (uint i = 0; i < material_SIZE; i++)
            if (requestStatus[Materials[i]] == false) // string comparison can also be done here
                flag = false;

        return flag;
    }



}