const Converter = require('./Converter');
const DECIMALS= 18;

class Erc20Converter extends Converter {

    toDecimals(amount, decimals= DECIMALS, precision) {
        return super.toDecimals(amount, DECIMALS);
    }

    fromDecimals(amount, decimals= DECIMALS) {
        return super.fromDecimals(amount, DECIMALS);
    }
}

module.exports = Erc20Converter;
