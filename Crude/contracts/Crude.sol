//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Crude {

    uint public noOfStudents;

    struct Students {
        uint id;
        uint grade;
        string name;
        string class;
    }

    Students[] public menStudent;
    mapping(uint => Students) students;

    function createProfile(uint _id, uint _grade, string memory _name, string memory _class) public {
        // students[_id] = Students ({
        //     id: _id,
        //     grade: _grade,
        //     name: _name,
        //     class: _class
        // });
        // students[_id] = Students(_id, _grade, _name, _class); // creating an instance of student...
        menStudent.push(Students(_id, _grade, _name, _class)); // pushing struct into array directly...
        noOfStudents++;
    }

    function readProfile(uint _id) public view returns(uint id, uint grade, string memory name, string memory class) {
        uint newStudent = loops(_id);
        return (menStudent[newStudent].id, menStudent[newStudent].grade, menStudent[newStudent].name, menStudent[newStudent].class);
    }

    function updateProfile(uint _id, string memory newClass) public returns(uint, string memory) {
            uint newStudent = loops(_id);
            menStudent[newStudent].class = newClass;
            return (menStudent[newStudent].id, menStudent[newStudent].class);     
    }

    function deleteProfile(uint _id) public {
        delete menStudent[_id];
    }

    // optimizing the code 
    function loops(uint _id) internal view returns(uint) { // internal because we will be using it with in the code only
        for(uint i = 0; i < menStudent.length; i++) {
            if(menStudent[i].id == _id) { // checking for the item position and returning it
                return i;
            }
        }
        revert("Student does not exist");
    }    

}

