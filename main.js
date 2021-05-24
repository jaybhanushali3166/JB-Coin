const SH256 = require("crypto-js/sha256");


class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = '';
    }
    createHash() {
        return SH256(this.index + this.timestamp
            + JSON.stringify(this.data)).toString()
    }
}

class BlockChain {
    constructor() {
        this.blockchain = [this.startGenesisBlock()]
    }
    startGenesisBlock() {
        return new Block(0, "01/01/2020", "Initial Block in the Chain", "0");
    }
    getLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }
    addNewBlock(newBlock) {
        newBlock.precedingHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.createHash();
        this.blockchain.push(newBlock);
    }
}


let JBCoin = new BlockChain();
JBCoin.addNewBlock(new Block(1, "25/05/2021", { sender: "Jay Bhanushali", recipient: "Elon Musk", quantity: 20 }));
JBCoin.addNewBlock(new Block(1, "26/05/2021", { sender: "Elon Musk", recipient: "Jay Bhanushali", quantity: 100 }));
console.log(JSON.stringify(JBCoin, null, 4))