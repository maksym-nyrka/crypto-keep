class AbstractCurrencyLibrary {

    constructor() {
        if (this.constructor === AbstractCurrencyLibrary) {
            throw new Error("Abstract class AbstractCurrencyLibrary can't be instantiated.");
        }
    }

    getCurrentAddress() {
        throw new Error("Method 'getCurrentAddress()' must be implemented.");
    }

    getCurrentBalance() {
        throw new Error("Method 'getCurrentBalance()' must be implemented.");
    }

    sendCurrency(to,amount) {
        throw new Error("Method 'sendCurrency(to,amount)' must be implemented.");
    }
}

module.exports = AbstractCurrencyLibrary;
