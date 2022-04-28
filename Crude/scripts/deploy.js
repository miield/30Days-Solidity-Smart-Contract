const hre = require("hardhat");

async function main() {

  // We get the contract to deploy
  const Crude = await hre.ethers.getContractFactory("contracts/Crude.sol:Crude");
  const crude = await Crude.deploy();

  await crude.deployed();

  console.log("Crude is deployed to:", crude.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
