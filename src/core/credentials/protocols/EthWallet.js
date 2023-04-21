const AbstractCurrencyWallet = require('./AbstractCurrencyWallet');
const bip32 = require("bip32");
const bip39 = require("bip39");
const privKeyToAddressETH = require('ethereum-private-key-to-address');

class EthWallet extends AbstractCurrencyWallet {

    getDerivationPath() {
        return `m/44'/60'/0'/0/0`;
    }

    provideAddress(mnemonic) {
        return new Promise(async (resolve, reject) => {
            try {
                //console.log("EthWallet provideAddress", mnemonic);
                const privateKey = await this.providePrivateKey(mnemonic);
                const address = privKeyToAddressETH(privateKey);
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
                const node = bip32.fromSeed(seed);
                const child = node.derivePath(this.getDerivationPath());
                const privateKey = child.privateKey.toString('hex');
                resolve(privateKey);
            } catch (e) {
                reject(e);
            }
        })
    }
}

module.exports = EthWallet;
