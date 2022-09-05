const hre = require("hardhat");

async function main() {

  // We get the contract to deploy
  const TodoList = await hre.ethers.getContractFactory("contracts/TodoList.sol:TodoList");
  const todolist = await TodoList.deploy();

  await todolist.deployed();

  console.log("TodoList deployed to:", todolist.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
