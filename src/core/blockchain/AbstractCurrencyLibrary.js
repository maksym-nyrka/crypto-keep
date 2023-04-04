const Validator = require("../validators/Validator");
const staticValidator = new Validator();

class AbstractCurrencyLibrary {

    constructor(provider, validator, converter) {
        staticValidator.validateObject(provider, "provider");
        staticValidator.validateObject(validator, "validator");
        staticValidator.validateObject(converter, "converter");

        this.setProvider(provider);
        this.setValidator(validator);
        this.setConverter(converter);
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

    getCurrentBalance() {
        return new Promise(async (resolve, reject) => {
            try {
                let address = await this.getAddress();
                let balance = await this.getBalance(address);
                this.getValidator().validateNumber(balance);

                resolve(balance);
            } catch (e) {
                reject(e);
            }
        })
    }

    sendCurrency(to, amount) {
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
                const privateKey = await this.getPrivateKey();
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
                const decimals = this.getConverter().fromDecimals(amount);
                this.getValidator().validateNumber(decimals);

                resolve(decimals);
            } catch (e) {
                reject(e);
            }
        })
    }
}

module.exports = AbstractCurrencyLibrary;
