import { expect } from "chai";
import { ethers } from "hardhat";
import { CustomeERC20 } from "../typechain-types";
import { PromiseOrValue } from "../typechain-types/common";

describe("CustomeERC20", async () => {
  let owner: any;
  let address1: { address: PromiseOrValue<string>; };
  let address2: { address: PromiseOrValue<string>; };
  let address3: { address: PromiseOrValue<string>; };
  let contract: CustomeERC20;
  let CustomeERC20;

  beforeEach(async () => {
    CustomeERC20 = await ethers.getContractFactory("CustomeERC20");
    [owner, address1, address2, address3] = await ethers.getSigners();
    contract = await CustomeERC20.deploy("StreaX", "STX", 1000, 18);
  })

  describe("Deployment", async () => {

    it("Should set the owner", async () => {
      expect((await contract.owner()).match(owner));
    });

    it("Should set the name of the token", async () => {
      expect((await contract.name()).match("StreaX"));
    });

    it("Should set the the symbol of the token", async () => {
      expect((await contract.symbol()).match("STX"));
    });

    it("Should set the symbol of the token", async () => {
      let decimal = Number(await contract.decimal());
      expect((decimal).toFixed(18));
    });

    it("Should set the totalsupply of the token", async () => {
      let totalSupply = await contract.totalSupply();
      let total = totalSupply.toString();
      expect(total.match("1000000000000000000000"));
    });

  });

  describe("balanceOf", async () => {

    it("Should return the balance of the token owner to total supply", async () => {
      let totalSupply = await contract.totalSupply();
      let ownerBalance = await contract.balanceOf(owner.address);
      expect(ownerBalance.toString().match((totalSupply.toString())));
    });

    it("Should return the balance of other addresses to 0", async () => {
      let address1Balance = Number(await contract.balanceOf(address1.address));
      let address2Balance = Number(await contract.balanceOf(address2.address));
      let address3Balance = Number(await contract.balanceOf(address3.address));

      expect(address1Balance.toFixed(0));
      expect(address2Balance.toFixed(0));
      expect(address3Balance.toFixed(0));
    });

  });

  describe("tokenFaucet", async () => {

    let transaction = contract.connect(address1 as unknown as string).tokenFaucet();

    it("Should give 10 tokens to address1", async () => {
      let balance = Number(await contract.balanceOf(address1.address));
      expect(balance.toFixed(10));
    });

    it("Should remove 10 tokens from owner address", async () => {
      let ownerBalance = Number(await contract.balanceOf(owner.address))
      let totalSupply = Number(await contract.totalSupply())
      expect(ownerBalance.toString().match((totalSupply - 10).toString()))
    })

  });


});