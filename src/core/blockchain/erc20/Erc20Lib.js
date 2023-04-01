const EthLib = require("../eth/EthLib");
const Converter = require('/src/core/helpers/Converter');

const ERC20_ABI = require("./erc20_abi");

const CONTRACT_ADDRESS = process.env.ERC20_ADDRESS;
const GAS_LIMIT = 300000;
const DECIMALS = 18;

class Erc20Lib extends EthLib {

    constructor() {
        super();
        this.setContract();
        this.converter = new Converter();
    }

    composeContract() {
        return new this.web3.eth.Contract(ERC20_ABI, this.getContractAddress());
    }

    setContract(){
        this.contract = this.composeContract();
    }

    getContractAddress() {
        return CONTRACT_ADDRESS;
    }

    getContract() {
        return this.contract;
    }

    getCurrentBalance() {
        return new Promise(async(resolve,reject)=>{
            try{
                let address = await this.getAddress();
                let balance = await this.getBalance(address);
                resolve(balance);
            }catch (e) {
                reject(e);
            }
        });
    }

    getBalance(address){
        return new Promise(async(resolve,reject)=>{
            try{
                let balance = await this.getContract().methods.balanceOf(address).call();
                balance = this.toDecimals(balance);
                resolve(balance);
            }catch (e) {
                reject(e);
            }
        });
    }

    getGasLimit(){
        return GAS_LIMIT;
    }

    sendCurrency(to,amount){
        return new Promise(async(resolve,reject)=>{
            try{
                amount = this.fromDecimals(amount);
                let data = this.getContract().methods.transfer(to, amount).encodeABI();
                console.log("sendCurrency data",data);
                let txData = await this._formatTransactionParams(this.getContractAddress(),"0",data);
                let hash = await this._makeTransaction(txData);
                resolve(hash);
            }catch (e){
                reject(e);
            }
        });
    }

    toDecimals(amount){
        return this.converter.toDecimals(amount,this.getDecimals());
    }

    fromDecimals(amount){
        return this.converter.fromDecimals(amount,this.getDecimals());
    }

    getDecimals(){
        return DECIMALS;
    }
}

module.exports = Erc20Lib;
