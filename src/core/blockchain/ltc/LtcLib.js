const BtcLib = require('/src/core/blockchain/btc/BtcLib');
const LtcBlockcypherProvider = require('/src/core/blockchain/ltc/LtcBlockcypherProvider');
const LtcValidator = require('/src/core/validators/blockchain/LtcValidator')
const LtcConverter = require('/src/core/converters/LtcConverter');
const NETWORK = require('/src/core/blockchain/ltc/LtcNetworks')["main"];
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
