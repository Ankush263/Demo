// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface ERC20Interface{
  function totalSupply() external view returns(uint);
  function balanceOf(address tokenOwner) external view returns(uint balance);
  function transfer(address to, uint tokens)external returns(bool success);
}

contract CustomeERC20 is ERC20Interface {

  // address of the owner of the token
  address public owner;
  // name of the token eg. StreaX
  string public name;
  // token symbol eg. STX
  string public symbol;
  // token decimal 0 - 18
  uint256 public decimal;
  // Total number of token in market
  uint256 public totalSupply;
  // balance[msg.sender] = amount
  mapping(address => uint256) public balance;


  constructor(string memory _name, string memory _symbol, uint256 _totalSupply, uint256 _decimal) {
    owner = msg.sender;
    name = _name;
    symbol = _symbol;
    decimal = _decimal;
    totalSupply = _totalSupply * (10 ** decimal);
    balance[owner] = totalSupply;
  }

  // with this function user can see their token balance
  function balanceOf(address _tokenOwner) public view returns(uint256) {
    return balance[_tokenOwner];
  }

  // with the help of this faucet, user can take 10 tokens at a time.
  // However if user had more then 10 tokens, they can't use this faucet.
  function tokenFaucet() public {
    require(msg.sender != owner, "Owner can't call this function");
    require(balance[msg.sender] <= 10, "Don't be greedy");
    balance[owner] -= 10;
    balance[msg.sender] += 10;
  }

  // With the help of this function, user can transfer any amount of token to another address.
  function transfer(address _to, uint256 _amount) public returns(bool success) {
    require(balance[msg.sender] >= _amount, "You don't have enough token");
    balance[msg.sender] -= _amount;
    balance[_to] += _amount;
    return true;
  }

}


// However there is another way to make ERC20 smartcontract. 
// Using Openzeppelin ERC20 contract.
// In Openzeppelin, everything comes with inbuilt. ⬇️



// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// contract DappToken is ERC20 {
//   constructor() ERC20("DANKUSH", "DANK") {
//     _mint(msg.sender, 10000 * (10 ^ 18));
//   }

//   function tokenFaucet(address payable to, uint256 amount) payable external {
//     _mint(to, amount);
//   }
// }