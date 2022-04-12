//SPDX-License-Identifier:  MIT
pragma solidity 0.8.10; 

/// @title A title that should describe the contract/interface
/// @author The name of the authorcd 
/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details
contract AdvanceStorage {

    uint[] public ages;

/// @dev To add age to the array
    function add(uint _ages) public {
        ages.push(_ages);
    }

/// @dev To get a specific age from the array
    function getAge(uint positionInArray) public view returns(uint ageInPosition) {
        ageInPosition = ages[positionInArray];
        return ageInPosition;
        // return ages[positionInArray]; // straight return
    }

/// @dev defining, assign &return using local variable
// function getAge(uint positionInArray) public view returns(uint) {
//     uint ageInPosition = ages[positionInArray];
//     return ageInPosition;
// }


    function getAllAges() public view returns(uint[] memory) {
        return ages;
    }

    /// @dev To get the length of the array
    function getLength() public view returns(uint) {
        return ages.length;
    }

}