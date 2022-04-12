const hre = require("hardhat");

async function main() {

  // We get the contract to deploy
  const AdvanceStorage = await ethers.getContractFactory("contracts/AdvanceStorage.sol:AdvanceStorage"); // this gets/imports the contract from the contract folder
  const advanceStorage = await AdvanceStorage.deploy();

  await advanceStorage.deployed(); // note that `deployed()` doesn't deploy the contract by itself, it only points to the JS object properties of a deployed contract

  console.log("AdvanceStorage is deployed to:", advanceStorage.address); // not needed
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
