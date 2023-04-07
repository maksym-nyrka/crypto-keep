const AbstractCurrencyWallet = require('./AbstractCurrencyWallet');
const {payments, networks} = require('bitcoinjs-lib');
const NETWORK = networks.testnet;
const bip39 = require("bip39");
const bip32 = require("bip32");

class BtcWallet extends AbstractCurrencyWallet {

    provideAddress(mnemonic) {
        return new Promise(async (resolve, reject) => {
            try {
                const seed = await bip39.mnemonicToSeed(mnemonic);
                const root = bip32.fromSeed(seed, NETWORK);
                const child = root.derivePath(`m/44'/1'/0'/0/0`);
                const {address} = payments.p2pkh({pubkey: child.publicKey, network: NETWORK});
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
                const root = bip32.fromSeed(seed, NETWORK);
                const child = root.derivePath(`m/44'/1'/0'/0/0`);
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
