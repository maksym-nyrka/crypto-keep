const Converter = require('./Converter');
const DECIMALS= 18;
class EthConverter extends Converter{

    toDecimals(amount, decimals= DECIMALS, precision) {
        return super.toDecimals(amount, DECIMALS);
    }

    fromDecimals(amount) {
        return super.fromDecimals(amount, DECIMALS);
    }
}

module.exports = EthConverter;
