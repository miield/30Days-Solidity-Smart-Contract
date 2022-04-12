// import expect object from chai, chai a library for testing
const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");
// import { Contract } from "ethers";
// const { Contract } = require("ethers");

// wrap the describe block
describe("Advance Storage", () => {

    let advanceStorage;
    let result;

    before(async function() {
        const AdvanceStorage = await ethers.getContractFactory("contracts/AdvanceStorage.sol:AdvanceStorage"); // this gets/imports the contract from the contract folder
        advanceStorage = await AdvanceStorage.deploy();
        await advanceStorage.deployed(); // note that `deployed()` doesn't deploy the contract by itself, it only points to the JS object properties of a deployed contract

        console.log("AdvanceStorage is deployed to:", advanceStorage.address); // not needed
    })

    it ("Should add elements to the array", async function () {
        const adds = await advanceStorage.add(7); // this add calls the add function 
        result = await advanceStorage.ages(0); // this calls the state variable and point to the slot 0 to store 7
        expect(result).to.equal(7);
    });

    it ("Should get the array element", async function () {
        await advanceStorage.add(13);
        result = await advanceStorage.ages(1);
        const getElement = await advanceStorage.getAge(1);
        expect(getElement).to.equal(13);
    });

    it ("Should get the all array elements", async function () {
        await advanceStorage.add(17);
        result = await advanceStorage.ages(2);
        const getAllElements = await advanceStorage.getAllAges();
        // const gAE = getAllElements.map(age => age()) // to map the elements together like a list of numbers
        // expect(getAllElements).to.equal([7, 13, 17]);
        expect(BigNumber[getAllElements]).to.equal(BigNumber.from[7, 13, 17]);
    });

    it ("Should get the array length", async function () {
        await advanceStorage.add(23);
        const getArrayLength = await advanceStorage.getAge(1);
        expect(getArrayLength).to.equal(13);
    })

})





