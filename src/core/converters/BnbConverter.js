const Converter = require('./Converter');
const DECIMALS = 18;

class BnbConverter extends Converter {

    toDecimals(amount, decimals= DECIMALS, precision) {
        return super.toDecimals(amount, decimals);
    }

    fromDecimals(amount, decimals= DECIMALS) {
        return super.fromDecimals(amount, decimals);
    }
}

module.exports = BnbConverter;
