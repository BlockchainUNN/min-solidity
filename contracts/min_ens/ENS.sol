// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract ENS {
    mapping(address => string) names;

    event StoredName(address _address, string _name);

    constructor(address _address, string memory _name) {
        names[_address] = _name;
        emit StoredName(_address, _name);
    }

    function store_name(string memory _name) public {
        names[msg.sender] = _name;
        emit StoredName(msg.sender, _name);
    }

    function get_name(address _address) public view returns (string memory) {
        string memory _name = names[_address];
        return _name;
    }
}