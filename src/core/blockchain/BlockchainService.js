const EthLib = require("./eth/EthLib");
const Erc20Lib = require('./erc20/Erc20Lib');
const BtcLib = require("./btc/BtcLib");
const CredentialService = require('/src/core/services/credentials/CredentialsService');

class BlockchainService {

    constructor(app) {
        this.app = app;
        this.credentials = new CredentialService(app);
        console.log("BlockchainService app",app);
        let eth = new EthLib(app);
        console.log("BlockchainService app2",app);
        let erc20 = new Erc20Lib(app);
        let btc = new BtcLib(app);

        this.libraries = {
            "ETH": eth,
            "ERC20": erc20,
            "BTC": btc,
        };
        console.log("libraries",this.libraries);
    }

    getCurrentLibrary() {
        console.log("getCurrentLibrary",this.app.getCurrency(),this.libraries[this.app.getCurrency()])
        return this.libraries[this.app.getCurrency()];
    }

    getCurrentAddress() {
        return new Promise(async (resolve, reject) => {
            try {
                let address = await this.getCurrentLibrary().getCurrentAddress();

                resolve(address);
            } catch (e) {
                reject(e);
            }
        })
    }

    sendCurrency(to, amount) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this.getCurrentLibrary().sendCurrency(to, amount);

                resolve(result);
            } catch (e) {
                reject(e);
            }
        })
    }

    getCurrentBalance() {
        return new Promise(async (resolve, reject) => {
            try {
                let balance = await this.getCurrentLibrary().getCurrentBalance();

                resolve(balance);
            } catch (e) {
                reject(e);
            }
        })
    }


    generateMnemonic() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this.credentials.generateMnemonic();
                resolve(result);
            } catch (e) {
                reject(e);
            }
        })
    }

    importMnemonic(mnemonic) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.credentials.importMnemonic(mnemonic);

                resolve();
            } catch (e) {
                reject(e);
            }
        })
    }
}

module.exports = BlockchainService;
