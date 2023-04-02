const DEFAULT_CURRENCY = "ETH";

const WalletUi = require("./core/ui/WalletUi");
const BlockchainService  = require("./core/blockchain/BlockchainService");

class Application {

    constructor() {
        this.setCurrency(DEFAULT_CURRENCY);
        this.blockchainService = new BlockchainService(this);
        this.walletUi = new WalletUi(this);
    }

    prepareInterface() {
        this.walletUi.prepareInterface();
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

    getCurrentBalance(){
        return new Promise(async(resolve,reject)=>{
            try{
                let balance = await this.blockchainService.getCurrentBalance();
                return resolve(balance);
            }catch (e){
                return reject(e);
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

    sendCurrency(to, amount) {
        return new Promise(async (resolve, reject) => {
            try {
                let address = await this.blockchainService.sendCurrency(to, amount);
                resolve(address);
            } catch (e) {
                reject(e);
            }
        })
    }
}

let app = new Application();
app.prepareInterface();
