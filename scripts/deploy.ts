import { ethers } from "hardhat";

async function main() {
  const TokenName = "StreaX"
  const TokenSymbol = "STX"
  const TotalSupply = 1000
  const Decimal = 18
  const CustomeERC20 = await ethers.getContractFactory("CustomeERC20")
  const customeERC20 = await CustomeERC20.deploy(TokenName, TokenSymbol, TotalSupply, Decimal)
  await customeERC20.deployed()
  console.log(
    `Your token ${TokenSymbol} is deployed to the address ${customeERC20.address}`
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
