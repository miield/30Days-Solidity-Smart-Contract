const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

describe("Todo List", () => {

  let todoList;
  let nofList;

  before(async function() {
    const TodoList = await ethers.getContractFactory("TodoList");
    todoList = await TodoList.deploy();
    await todoList.deployed(); 
  })

  it("Should add items to the list", async function () {

    const addToList = await todoList.addToList(1, "Skincare", false);
    expect(addToList[0]).to.equal(BigNumber.from[1], "Skincare", false);

  });

  it("Should read todo items on the list", async function () {

    const addToList = await todoList.addToList(2, "Lunch", false);
    const readList = await todoList.readList(2);
    expect(readList[0]).to.equal(BigNumber.from(2), "Lunch", false);

  });

  it("Should update items on the list", async function () {

    const addToList = await todoList.addToList(1, "Skincare", false);
    const addToList2 = await todoList.addToList(2, "Lunch", false)
    const editListItem = await todoList.editListItem(1, "Nahmii");
    expect(editListItem[0]).to.equal(BigNumber.from[1], "Nahmii");
    console.log("item 1 was changed to Nahmii:", editListItem.item);

  });

});
