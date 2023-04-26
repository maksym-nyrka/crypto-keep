const DEFAULT_CURRENCY = "ETH";

const WalletUi = require("./core/ui/WalletUi");
const BlockchainService = require("./core/blockchain/BlockchainService");
const HttpService = require("./core/services/HttpService");
const isProduction = require("./core/helpers/isProduction");
const FetchService = require("./core/fetch/FetchService");

class Application {

    constructor() {
        this.setCurrency(DEFAULT_CURRENCY);
        this.httpService = new HttpService(this);
        this.walletUi = new WalletUi(this);
        this.blockchainService = new BlockchainService(this);
        this.fetchService = new FetchService();
    }

    isProduction() {
        return isProduction;
    }

    prepareInterface() {
        this.walletUi.renderUi();
    }

    changeCurrency(currency) {
        this.setCurrency(currency);
        this.walletUi.renderUi();
    }

    setCurrency(currency) {
        this.currency = currency;
    }

    getCurrency() {
        return this.currency;
    }

    getCurrentBalance() {
        return new Promise(async (resolve, reject) => {
            try {
                let balance = await this.blockchainService.getCurrentBalance();
                resolve(balance);
            } catch (e) {
                reject(e);
            }
        })
    }

    getCurrentAddress() {
        return new Promise(async (resolve, reject) => {
            try {
                let address = await this.blockchainService.getCurrentAddress();
                resolve(address);
            } catch (e) {
                reject(e);
            }
        })
    }

    getCurrencyFullName() {
        return new Promise(async (resolve, reject) => {
            try {
                let name = await this.blockchainService.getCurrencyFullName();
                resolve(name);
            } catch (e) {
                reject(e);
            }
        })
    }

    getCurrencyImage() {
        return new Promise(async (resolve, reject) => {
            try {
                let image = await this.blockchainService.getCurrencyImage();
                resolve(image);
            } catch (e) {
                reject(e);
            }
        })
    }

    sendCurrency(to, amount) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this.blockchainService.sendCurrency(to, amount);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        })
    }

    generateMnemonic() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this.blockchainService.generateMnemonic();
                resolve(result);
            } catch (e) {
                reject(e);
            }
        })
    }

    importMnemonic(mnemonic) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this.blockchainService.importMnemonic(mnemonic);
                this.prepareInterface();
                //console.log("importMnemonic" ,this)
                resolve(result);
            } catch (e) {
                reject(e);
            }
        })
    }

    getCurrentTransactionUrl(tx) {
        return new Promise(async (resolve, reject) => {
            try {
                let url = await this.blockchainService.getCurrentTransactionUrl(tx);
                //console.log("App getCurrentTransactionUrl after:" + url);
                resolve(url);
            } catch (e) {
                reject(e);
            }
        })
    }

    fetchCurrentBlockchainData(key) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.fetchService.fetchBlockchainData(this.getCurrency(), key);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        })

    }
}

new Application();
