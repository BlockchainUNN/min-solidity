// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "../../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TOKEN is ERC20 {
    constructor(string memory name, string memory symbol, uint256 initialSupply, address recipient) ERC20(name, symbol) {
        _mint(recipient, initialSupply*10**18);
    }
}