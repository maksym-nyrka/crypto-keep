class CurrencyConverter {

    toDecimals(amount, decimals, precision= 8) {
        return (amount / Math.pow(10, decimals)).toFixed(precision);
    }

    fromDecimals(amount, decimals, precision= 8) {
        amount = parseFloat(amount);
        return (amount * Math.pow(10, decimals)).toFixed(precision);
    };
}

module.exports = CurrencyConverter;
