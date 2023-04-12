const BtcWallet = require("./BtcWallet");
const isProduction = require("../../helpers/isProduction");
const NETWORK = require('/src/core/blockchain/ltc/LtcNetworks')["main"];


class LtcWallet extends BtcWallet {

    getDerivationPath() {
        return isProduction ? `m/44'/2'/0'/0/0` : `m/44'/1'/0'/0/0`;
    }

    getNetwork() {
        return NETWORK;
    }

}

module.exports = LtcWallet;
