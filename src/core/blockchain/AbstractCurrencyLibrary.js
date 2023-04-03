const Validator = require("../validators/Validator");
const staticValidator = new Validator();

class AbstractCurrencyLibrary {

    constructor(provider, validator, converter) {
        staticValidator.validateObject(provider, "provider");
        staticValidator.validateObject(validator, "validator");
        staticValidator.validateObject(converter, "converter");

        this.provider = provider;
        this.validator = validator;
        this.converter = converter;
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
    };

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
        return this.getConverter().toDecimals(amount);
    }

    fromDecimals(amount) {
        return this.getConverter().fromDecimals(amount);
    }
    // toDecimals(amount) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             reject("toDecimals(amount) not implemented");
    //         } catch (e) {
    //             reject(e);
    //         }
    //     })
    // };
    //
    // fromDecimals(amount) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             reject("fromDecimals(amount) not implemented");
    //         } catch (e) {
    //             reject(e);
    //         }
    //     })
    // };

    getProvider() {
        return this.provider;
    }

    setProvider(provider) {
        this.provider = provider;
    }

    setValidator(validator) {
        this.validator = validator;
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
}

module.exports = AbstractCurrencyLibrary;
