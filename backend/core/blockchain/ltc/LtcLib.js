const BtcLib = require("../btc/BtcLib");
const LtcBlockcypherProvider = require("./LtcBlockcypherProvider");
const LtcValidator = require("../../validators/blockchain/LtcValidator");
const LtcConverter = require("../../converters/LtcConverter");
const NETWORK = require('./LtcNetworks')["main"];
const MAINNET_EXPLORER = "https://live.blockcypher.com/ltc";

class LtcLib extends BtcLib {

    constructor(app) {
        super(app);
        this.validator = new LtcValidator();
        this.converter = new LtcConverter();
        this.provider = new LtcBlockcypherProvider(app, this.validator, this.converter);
    }

    getNetwork() {
        return NETWORK;
    }

    getTransactionUrl(tx) {
        return new Promise(async (resolve, reject) => {
            try {
                const transactionUrl = `${MAINNET_EXPLORER}/tx/${tx}`;
                resolve(transactionUrl);
            } catch (e) {
                reject(e);
            }
        })
    }
}

module.exports = LtcLib;
