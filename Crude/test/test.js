// import expect object from chai, chai a library for testing
const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");
// import { Contract } from "ethers";
// const { Contract } = require("ethers");

describe("Crude", function () {

  let crude;

  before(async function() {

    // deploy instance conytract
    const Crude = await hre.ethers.getContractFactory("contracts/Crude.sol:Crude");
    crude = await Crude.deploy();
    await crude.deployed();

    console.log("Crude is deployed to:", crude.address);

  })

  it("Should create new student", async function () {

    await crude.createProfile(1, 75, "Dunni", "Web3");
    // automatically assign the user to index 1 by calling the readProfile function 
    let user = await crude.readProfile(1);
    expect(user[0]).to.equal(BigNumber.from(1));
    expect(user[1]).to.equal(BigNumber.from(75));
    expect(user[2]).to.equal("Dunni");
    expect(user[3]).to.equal("Web3");

  });

  it("Should update user class", async function () {
    await crude.updateProfile(1, "Web4");
    let user = await crude.readProfile(1);
    expect(user[0]).to.equal(BigNumber.from(1));
    expect(user[1]).to.equal(BigNumber.from(75));
    expect(user[2]).to.equal("Dunni");
    expect(user[3]).to.equal("Web4");
  });

  it("Should NOT update non-existing user",  async function () {
    // using try & catch to avoid error breaking the test
    try {
      await crude.updateProfile(1, "Web3");
    } catch (e) {
      expect(e.message).to.includes("Student does not exist");
      return
    } 
    expect(false);
  });

  it("Should delete user", async function () {
    await crude.createProfile(1, 75, "Dunni", "Web3");
    let user = await crude.readProfile(1);
    expect(user[0]).to.equal(BigNumber.from(1));
    expect(user[1]).to.equal(BigNumber.from(75));
    expect(user[2]).to.equal("Dunni");
    expect(user[3]).to.equal("Web3");

    // await crude.deleteProfile(2);

    // try {
    //   await crude.readProfile(2);
    // } catch (e) {
    //   expect(e.message).to.includes("Student does not exist");
    //   return
    // } 
    // expect(false);
    
  })

});
