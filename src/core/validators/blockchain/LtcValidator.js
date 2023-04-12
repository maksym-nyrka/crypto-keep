const BtcValidator = require("./BtcValidator");

const LTC = "LTC";

class LtcValidator extends BtcValidator {

    validateAddress(address) {
        super.validateAddress(address, LTC);
    };
}

module.exports = LtcValidator;
