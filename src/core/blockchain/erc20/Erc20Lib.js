const EthLib = require("../eth/EthLib");
const Erc20Converter = require("../../helpers/Erc20Converter");

const ERC20_ABI = require("./erc20_abi");
const EthValidator = require("../../validators/blockchain/EthValidator");
const EthConverter = require("../../helpers/EthConverter");

const CONTRACT_ADDRESS = process.env.ERC20_ADDRESS;
const GAS_LIMIT = 300000;
const DECIMALS = 18;

class Erc20Lib extends EthLib {

    constructor() {
        super();
        this.setContract();
        this.setValidator(new EthValidator());
        this.setConverter(new EthConverter());
    }

    composeContract() {
        return new this.provider.eth.Contract(ERC20_ABI, this.getContractAddress());
    }

    setContract() {
        this.contract = this.composeContract();
    }

    getContractAddress() {
        return CONTRACT_ADDRESS;
    }

    getContract() {
        return this.contract;
    }

    getBalance(address) {
        return new Promise(async (resolve, reject) => {
            try {
                this.getValidator().validateAddress(address);

                let balance = await this.getContract().methods.balanceOf(address).call();
                balance = await this.toDecimals(balance);

                resolve(balance);
            } catch (e) {
                reject(e);
            }
        });
    }

    getGasLimit() {
        return GAS_LIMIT;
    }

    sendCurrency(to, amount) {
        return new Promise(async (resolve, reject) => {
            try {
                this.getValidator().validateAddress(to);
                this.getValidator().validateNumber(amount);

                amount = await this.fromDecimals(amount);

                let data = this.getContract().methods.transfer(to, amount).encodeABI();
                let txData = await this._formatTransactionParams(this.getContractAddress(), "0", data);
                let hash = await this._makeTransaction(txData);

                resolve(hash);
            } catch (e) {
                reject(e);
            }
        });
    }

    getDecimals() {
        return DECIMALS;
    }
}

module.exports = Erc20Lib;
