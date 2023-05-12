const EthLib = require("../eth/EthLib");
const Erc20Converter = require("../../converters/Erc20Converter");

const ERC20_ABI = require("./erc20_abi");
const EthValidator = require("../../validators/blockchain/EthValidator");
const Web3 = require("web3");

const MKN_TOKEN_ADDRESS = "0x3fb9fc5d42891Fa52e8dcBA892a3a9232d6A3CA4";
const GAS_LIMIT = 300000;
const DECIMALS = 18;

const INFURA_PROVIDER_URL = `https://network.infura.io/v3/`;
const SEPOLIA_NETWORK = "sepolia";

class Erc20Lib extends EthLib {

    constructor(app) {
        super(app);
        let web3 = new Web3(new Web3.providers.HttpProvider(this.getProviderUrl()));
        this.setProvider(web3);
        this.setContract();
        this.setValidator(new EthValidator());
        this.setConverter(new Erc20Converter());
        this.setApp(app);
    }

    getProviderUrl() {
        return `${INFURA_PROVIDER_URL}${process.env.INFURA_API_TOKEN}`
            .replace('network', SEPOLIA_NETWORK);
    }

    composeContract() {
        return new this.provider.eth.Contract(ERC20_ABI, this.getContractAddress());
    }

    setContract() {
        this.contract = this.composeContract();
    }

    getContractAddress() {
        return MKN_TOKEN_ADDRESS;
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
