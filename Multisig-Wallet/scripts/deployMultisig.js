
const hre = require("hardhat");

async function main() {

  // We get the contract to deploy
  const Multisig = await ethers.getContractFactory("contracts/Multisig.sol:Multisig"); // this gets/imports the contract from the contract folder
  const multisig = await Multisig.deploy();

  await multisig.deployed(); // note that `deployed()` doesn't deploy the contract by itself, it only points to the JS object properties of a deployed contract

  console.log("Multisig is deployed to:", multisig.address); // not needed
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
