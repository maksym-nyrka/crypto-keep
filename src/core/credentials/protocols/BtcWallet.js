const AbstractCurrencyWallet = require('./AbstractCurrencyWallet');
const {payments, networks} = require('bitcoinjs-lib');
const bip39 = require("bip39");
const bip32 = require("bip32");
const isProduction = require("../../helpers/isProduction");

class BtcWallet extends AbstractCurrencyWallet {

    getDerivationPath() {
        return isProduction ? `m/44'/0'/0'/0/0` : `m/44'/1'/0'/0/0`;
    }

    getNetwork() {
        return isProduction ? networks.bitcoin : networks.testnet;
    }

    provideAddress(mnemonic) {
        return new Promise(async (resolve, reject) => {
            try {
                const seed = await bip39.mnemonicToSeed(mnemonic);
                const root = bip32.fromSeed(seed, this.getNetwork());
                const child = root.derivePath(this.getDerivationPath());
                const {address} = payments.p2pkh({pubkey: child.publicKey, network: this.getNetwork()});
                resolve(address);
            } catch (e) {
                reject(e);
            }
        })
    }

    providePrivateKey(mnemonic) {
        return new Promise(async (resolve, reject) => {
            try {
                const seed = await bip39.mnemonicToSeed(mnemonic);
                const root = bip32.fromSeed(seed, this.getNetwork());
                const child = root.derivePath(this.getDerivationPath());
                const privateKey = child.toWIF();
                console.log("providePrivateKey(mnemonic)", privateKey);
                resolve(privateKey);
            } catch (e) {
                reject(e);
            }
        })
    }

}

module.exports = BtcWallet;
