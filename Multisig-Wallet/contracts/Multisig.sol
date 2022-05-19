//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract RealMultisig is Ownable {

    uint8 txId; // dynamic transaction id/identifier/pointer instead of manually setting it in the struct
    uint8 constant _MAXSIG = 2; // maximum signature
    // properties of transactions
    struct Transaction {
        uint8 signatureCounts;  // no of signatures
        address from;
        address to;
        uint amount;
        mapping(address => uint8) signatures; // to know the addresses that has signed the transaction.
    }

    uint[] pendingTx; // transaction mempool

    mapping(uint8 => Transaction) transactions;
    mapping(address => uint) public addressToBalance;
    mapping(address => bool) public isExist;

    modifier isAddrExist(address _address) {
        require(isExist[_address] == true, "Address doesn't exist");
        _;
    }

    modifier isEligible() {
        // owner() from ownable...
        require( msg.sender == owner() || isExist[msg.sender], "Address not eligble");
        _;
    }

    event completedTransaction(address from, address to, uint amount);
    event TxCreated(address from, address to, uint amount);

    function newSignature(address newAddress) public onlyOwner {
        require(newAddress != address(0), "Invalid Address");
        require(isExist[newAddress] == false, "Address Exists");
        isExist[newAddress] = true;
    }

    function checkAddress(address _address) public view returns(bool) {
        return isExist[_address];
    }

    function removeAddress(address _address) public onlyOwner {
        require(isExist[_address] == true, "Address doesn't exists");
        isExist[_address] = false;
    }

    function deposit() public payable {
        require(msg.value > 0, "Amount cannot be zero");
        addressToBalance[address(this)] += msg.value;
    }

    function newTransaction(
        // address _signatureCounts, // unused
        address _to,
        uint _amount
        ) public isEligible {
        require(address(this).balance >= _amount, "Balance not enough");
        uint8 transId = txId++; // dynamically increamenting the ids

        Transaction storage newTx; // instance of transaction with the struct type
        newTx.signatureCounts = 0;
        newTx.from = msg.sender;
        newTx.to = _to;
        newTx.amount = _amount;

        newTx = transactions[transId]; // creating new tx
        pendingTx.push(transId); // push the new tx id/indentifer/pointer to the pool of pending txs
        emit TxCreated(msg.sender, _to, _amount);
    }

    function signTx(uint _transId) public isEligible {
        // create instance of tx using the pointer/id
        Transaction storage signedTx = transactions[_transId];

        // Address zero cannot sign tx
        require(signedTx.from =! 0x0, "Invalid Address");

        // Tx creator cannot sign
        require(msg.sender =! signedTx.from, "Creator cannot sign");

        // Cannot sign twice
        require(signedTx.signatures[msg.sender] =! 1, "Address already signed");

        // count the signature
        signedTx.signatures[msg.sender] = 1;
        signedTx.signatureCounts++;

        if(signedTx.signatures[msg.sender] = _MAXSIG) {
            require(address(this).balance >= amount, "Account balance not enough");
            // transfer to the address to
            signedTx.to.transfer(signedTx.amount);
            address(this).balance -= amount;
        }
    }

    receive () external payable {
        
    }
}