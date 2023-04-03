const AbstractCurrencyLibrary = require("../AbstractCurrencyLibrary");
const BlockcypherProvider = require("./BlockcypherProvider");
const BtcValidator = require("../../validators/blockchain/BtcValidator");
const BtcConverter = require("../../helpers/BtcConverter");

const BTC_ADDRESS = process.env.BTC_ADDRESS;
const BTC_PRIVATE = process.env.BTC_PRIVATE;
const BTC_WIF = process.env.BTC_WIF;

class BtcLib extends AbstractCurrencyLibrary {

    constructor() {
        let provider = new BlockcypherProvider();
        let validator = new BtcValidator();
        let converter = new BtcConverter();
        super(provider, validator, converter);
    }

    getAddress(){
        return new Promise(async(resolve,reject)=>{
            try {
                resolve(BTC_ADDRESS);
            }catch(e){
                reject(e);
            }
        })
    };

    getBalance(address) {
        return new Promise(async (resolve, reject) => {
            try {
                this.getValidator().validateAddress(address);

                let balance = await this.provider.getBalance(address);
                balance = this.toDecimals(balance);

                resolve(balance);
            } catch (e) {
                reject(e);
            }
        })
    }

    getPrivateKey() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(BTC_PRIVATE);
            } catch (e) {
                reject(e);
            }
        })
    }
}

module.exports = BtcLib;
