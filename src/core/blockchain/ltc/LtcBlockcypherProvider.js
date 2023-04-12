const BlockcypherProvider = require("../../services/BlockcypherProvider");

const COIN = "ltc";
const NETWORK = 'main';

class LtcBlockcypherProvider extends BlockcypherProvider {

    getCoinName() {
        return COIN;
    }

    getNetworkName() {
        return NETWORK;
    }
}

module.exports = LtcBlockcypherProvider;
