const Validator = require("../validators/Validator");
const staticValidator = new Validator();

class AbstractCurrencyLibrary {

    constructor(app, provider, validator, converter) {
        staticValidator.validateObject(app, "app");
        staticValidator.validateObject(provider, "provider");
        staticValidator.validateObject(validator, "validator");
        staticValidator.validateObject(converter, "converter");

        this.setApp(app);
        this.setProvider(provider);
        this.setValidator(validator);
        this.setConverter(converter);
    }

    setApp(app) {
        this.app = app;
    }

    getApp() {
        return this.app;
    }

    getProvider() {
        return this.provider;
    }

    setProvider(provider) {
        this.provider = provider;
    }

    getConverter() {
        return this.converter;
    }

    setConverter(converter) {
        this.converter = converter;
    }

    getValidator() {
        return this.validator;
    }

    setValidator(validator) {
        this.validator = validator;
    }

    getCredentials(){
        return this.app.blockchainService.credentials;
    }

    getCurrentAddress() {
        return new Promise(async (resolve, reject) => {
            try {
                let address = await this.getCredentials().getAddress();
                //console.log("AbstractCurrencyLib getAddress",address)
                resolve(address);
            } catch (e) {
                reject(e);
            }
        })
    }

    getCurrentBalance() {
        return new Promise(async (resolve, reject) => {
            try {
                let address = await this.getCurrentAddress();
                let balance = await this.getBalance(address);
                this.getValidator().validateNumber(balance);

                resolve(balance);
            } catch (e) {
                reject(e);
            }
        })
    }

    sendCurrency() {
        return new Promise(async (resolve, reject) => {
            try {
                reject("sendCurrency(to,amount) not implemented");
            } catch (e) {
                reject(e);
            }
        })
    }

    getCurrentPrivateKey() {
        return new Promise(async (resolve, reject) => {
            try {
                let privateKey = await this.getCredentials().getPrivateKey();
                //console.log("AbstractCurrencyLib privateKey",privateKey)
                this.getValidator().validateString(privateKey);

                resolve(privateKey);
            } catch (e) {
                reject(e);
            }
        })
    }

    toDecimals(amount) {
        return new Promise(async (resolve, reject) => {
            try {
                const decimals = await this.getConverter().toDecimals(amount);
                this.getValidator().validateNumber(decimals);

                resolve(decimals);
            } catch (e) {
                reject(e);
            }
        })
    }

    fromDecimals(amount) {
        return new Promise(async (resolve, reject) => {
            try {
                const decimals = await this.getConverter().fromDecimals(amount);
                this.getValidator().validateNumber(decimals);

                resolve(decimals);
            } catch (e) {
                reject(e);
            }
        })
    }

    getCurrentTransactionUrl(tx) {
        return new Promise(async (resolve, reject) => {
            try {
                this.getValidator().validateString(tx);

                const url = await this.getTransactionUrl(tx);
                this.getValidator().validateUrl(url);

                resolve(url);
            } catch (e) {
                reject(e);
            }
        })
    }
}

module.exports = AbstractCurrencyLibrary;
