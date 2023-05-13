const HttpService = require("./HttpService");
const isProduction = require("../helpers/isProduction");

class FetchData {

    BACKEND_URL = isProduction ? 'https://vh6o5auivh.execute-api.eu-central-1.amazonaws.com/production'
        : 'http://localhost:8081';

    constructor() {
        this.httpService = new HttpService();
    }

    async fetchBlockchainObject(currency) {
        const url = `${this.BACKEND_URL}/blockchains/${currency}`;
        return await this.httpService.getRequest(url);
    }

    async loginWithMnemonic(mnemonic) {
        const url = `${this.BACKEND_URL}/loginWithMnemonic/`;
        let body = JSON.stringify({"mnemonic": mnemonic});
        return await this.httpService.postRequest(url, body);
    }

    async sendCurrency(to, amount) {
        const url = `${this.BACKEND_URL}/sendCurrency/`;
        let body = JSON.stringify({"to": to, "amount": amount});
        return await this.httpService.postRequest(url, body);
    }
}

module.exports = FetchData;
