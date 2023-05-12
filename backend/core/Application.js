const BlockchainService = require("./blockchain/BlockchainService");
const HttpService = require("./services/HttpService");
const isProduction = require("./helpers/isProduction");
const MongoDbClient = require("./mongodb/MongoDbClient");

class Application {

    constructor() {
        this.httpService = new HttpService(this);
        this.blockchainService = new BlockchainService(this);
        this.mongoDbClient = new MongoDbClient();
    }

    isProduction() {
        return isProduction;
    }

    isValidCurrency(currency) {
        for (const [key] of Object.entries(this.blockchainService.libraries)) {
            if (key === currency) {
                return true;
            }
        }
        return false;
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
        return new Promise(async (resolve) => {
            let response = {};
            try {
                const txHash = await this.blockchainService.sendCurrency(to, amount);
                response.result = await this.getCurrentTransactionUrl(txHash);
                response.status = 'success';
                resolve(response);
            } catch (err) {
                response.result = err.message;
                response.status = 'error';
                resolve(response);
            }
        })
    }

    setMnemonic(mnemonic) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this.blockchainService.setMnemonic(mnemonic);
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

    getCurrentBlockchainDbData(key) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this.mongoDbClient.getBlockchainData(key, this.getCurrency());
                resolve(result);
            } catch (e) {
                reject(e);
            }
        })

    }
}

module.exports = Application;
