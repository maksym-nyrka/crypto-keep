const HttpService = require("./HttpService");

class FetchData {

    BACKEND_URL = 'https://vh6o5auivh.execute-api.eu-central-1.amazonaws.com/prod/';

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
