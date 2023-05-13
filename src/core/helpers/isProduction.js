let isProduction = process.env.NODE_ENV === 'production';
// console.log("is Production", isProduction, process.env.NODE_ENV);
module.exports = isProduction;
