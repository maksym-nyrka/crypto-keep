const WalletUi = require("./core/ui/WalletUi");
const FetchService = require("./core/services/FetchData");
const MnemonicGenerator = require("./core/services/MnemonicGenerator");

class Application {

    constructor() {
        this.walletUi = new WalletUi(this);
        this.fetchService = new FetchService();
        this.mnemonicGenerator = new MnemonicGenerator();
    }

    async setBlockchain(blockchain) {
        this.blockchain = blockchain;
    }

    async changeCurrency(currency) {
        this.setCurrency(currency);
        await this.updateCurrentCurrency();
    }

    async updateCurrentCurrency() {
        await this.setBlockchain(await this.fetchCurrentBlockchainObject());
        await this.walletUi.renderUi();
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
                let balance = this.blockchain['balance'];
                resolve(balance);
            } catch (e) {
                reject(e);
            }
        })
    }

    getCurrentAddress() {
        return new Promise(async (resolve, reject) => {
            try {
                let address = this.blockchain['address'];
                resolve(address);
            } catch (e) {
                reject(e);
            }
        })
    }

    getCurrencyFullName() {
        return new Promise(async (resolve, reject) => {
            try {
                let name = this.blockchain['fullName'];
                resolve(name);
            } catch (e) {
                reject(e);
            }
        })
    }

    getCurrencyImage() {
        return new Promise(async (resolve, reject) => {
            try {
                let image = this.blockchain['imagePath'];
                resolve(image);
            } catch (e) {
                reject(e);
            }
        })
    }

    sendCurrency(to, amount) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this.fetchService.sendCurrency(to, amount);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        })
    }

    generateMnemonic() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = this.mnemonicGenerator.generateMnemonic();
                resolve(result);
            } catch (e) {
                reject(e);
            }
        })
    }

    loginWithMnemonic(mnemonic) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this.fetchService.loginWithMnemonic(mnemonic);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        })
    }

    fetchCurrentBlockchainObject() {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.fetchService.fetchBlockchainObject(this.getCurrency());
                // console.log('fetchCurrentBlockchainObject:', result);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        })
    }
}

new Application();
