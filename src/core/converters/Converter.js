const PRECISION = 4;

class CurrencyConverter {

    toDecimals(amount, decimals, precision= PRECISION) {
        const result = amount / Math.pow(10, decimals);
        return result.toFixed(precision);
    }

    fromDecimals(amount, decimals) {
        const result = amount * Math.pow(10, decimals);
        return String(result);
    };
}

module.exports = CurrencyConverter;
