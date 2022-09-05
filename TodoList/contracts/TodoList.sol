//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract TodoList {

    uint public noOfList = 0;

    struct List {
        uint id;
        string item;
        bool completed;
    }

    mapping(uint => List) list;

    function addToList(uint _id, string memory _item, bool _completed) public {
        list[_id] = List(_id, _item, _completed);
        noOfList++;
    }

    function readList(uint _id) public view returns(List memory) {
        return list[_id];
    }

    function editListItem(uint _id, string memory _item) public returns(List memory) {
        List storage newlist = list[_id];
        newlist.item = _item;
        return list[_id];
    }

    function deleteItem(uint _id) public {
        delete list[_id];
    }

}
