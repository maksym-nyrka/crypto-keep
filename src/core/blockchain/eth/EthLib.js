const Web3 = require("web3");
const Transaction = require('ethereumjs-tx');
const EthConverter = require("../../helpers/EthConverter");
const AbstractCurrencyLibrary = require("../AbstractCurrencyLibrary")

class EthLib extends AbstractCurrencyLibrary {

    PROVIDER_URL = process.env.PROVIDER_URL;
    ETH_ADDRESS = process.env.ETH_ADDRESS;
    PRIVATE_KEY = process.env.SIGNER_PRIVATE_KEY;
    GWEI = 10**9;
    GAS_PRICE = 70 * this.GWEI;
    GAS_LIMIT = 21000;

    constructor() {
        super();
        this.web3 = new Web3(new Web3.providers.HttpProvider(this.PROVIDER_URL));
        this.converter = new EthConverter();
    }

    getAddress() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(this.ETH_ADDRESS);
            } catch (e) {
                reject(e);
            }
        })
    }

    getCurrentAddress() {
        return new Promise(async (resolve, reject) => {
            try {
                let address = await this.getAddress();
                resolve(address);
            } catch (e) {
                reject(e);
            }
        })
    }

    getCurrentBalance(){
        return new Promise(async(resolve,reject)=>{
            try{
                let address = await this.getAddress();
                let balance = await this.getBalance(address);

                resolve(balance);
            }catch (e){
                reject(e);
            }
        })
    }

    getBalance(address) {
        return new Promise(async (resolve, reject) => {
            try {
                let balance = await this.web3.eth.getBalance(address);
                balance = this.converter.toDecimals(balance);

                resolve(balance);
            } catch (e) {
                reject(e);
            }
        })
    }

    getPrivateKey(){
        return new Promise(async(resolve,reject)=>{
            try{
                resolve(this.PRIVATE_KEY);
            }catch (e){
                reject(e);
            }
        })
    }

    sendCurrency(to, amount) {
        return new Promise(async (resolve, reject) => {
            try {
                let txData = await this._formatTransactionParams(to,amount);
                let hash = await this._makeTransaction(txData);

                resolve(hash);
            } catch (e) {
                reject(e);
            }
        })
    }

    _formatTransactionParams(to,value, data=""){
        return new Promise(async(resolve,reject)=>{
            try{
                let privateKey = await this.getPrivateKey();
                let privateKeyBuffer=Buffer.from(privateKey,'hex');
                let from = await this.getAddress();
                let nonce = await this.getNextNonce();

                let gasPrice = this.getGasPrice();
                let gasLimit = this.getGasLimit();
                value = this.converter.fromDecimals(value);

                let txParams = {
                    "from":from,
                    "to":to,
                    "privateKey":privateKeyBuffer,
                    "value":this.web3.utils.numberToHex(value),
                    "gasPrice":this.web3.utils.numberToHex(gasPrice),
                    "gasLimit":gasLimit,
                    "nonce":nonce,
                    "data":data,
                };

                resolve(txParams);
            }catch (e){
                reject(e);
            }
        })
    }

    getGasPrice(){
        return this.GAS_PRICE;
    }

    getGasLimit(){
        return this.GAS_LIMIT;
    }

    getNextNonce(){
        return new Promise(async(resolve,reject)=>{
            try{
                let address = String(await this.getAddress());
                let nonce = await this.web3.eth.getTransactionCount(address);

                resolve(nonce);
            }catch (e){
                reject(e)
            }
        });
    }

    _makeTransaction(txParams){
        return new Promise(async (resolve,reject)=>{
            try{
                const tx = new Transaction(txParams);
                tx.sign(txParams.privateKey);
                const raw = `0x${tx.serialize().toString('hex')}`;

                this.web3.eth.sendSignedTransaction(raw).on("receipt",(data)=>{
                    console.log(data);
                    let transactionHash = data["transactionHash"];
                    resolve(transactionHash);
                }).on("error",(e)=>{
                    console.error(e);
                    reject(e);
                });

            }catch(e){
                reject(e);
            }
        });
    }
}

module.exports = EthLib;
