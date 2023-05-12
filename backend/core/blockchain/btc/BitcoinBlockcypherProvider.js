const BlockcypherProvider = require("../../services/BlockcypherProvider");
const isProduction = require("../../helpers/isProduction");

const COIN = "btc";
const MAIN_NETWORK = 'main';
const TEST_NETWORK = 'test3';

class BitcoinBlockcypherProvider extends BlockcypherProvider {

    getCoinName() {
        return COIN;
    }

    getNetworkName() {
        return isProduction ? MAIN_NETWORK : TEST_NETWORK;
    }
}

module.exports = BitcoinBlockcypherProvider;
