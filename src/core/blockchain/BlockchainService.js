const EthLib = require("./eth/EthLib");
const Erc20Lib = require('./erc20/Erc20Lib');
const BtcLib = require("./btc/BtcLib");

class BlockchainService {

    constructor(app) {
        this.app = app;
        let eth = new EthLib();
        let erc20 = new Erc20Lib();
        let btc = new BtcLib(app);

        this.libraries = {
            "ETH":eth,
            "ERC20":erc20,
            "BTC": btc,
        };
    }

    getCurrentLibrary(){
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

    getCurrentBalance(){
        return new Promise(async(resolve,reject)=>{
            try{
                let balance = await this.getCurrentLibrary().getCurrentBalance();

                resolve(balance);
            }catch (e){
                reject(e);
            }
        })
    }
}

module.exports = BlockchainService;
