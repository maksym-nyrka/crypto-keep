require('dotenv').config()
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    testMnemonic: "movie avoid rack lesson rival rice you average caution eternal distance wood",
    backendUrl: "https://vh6o5auivh.execute-api.eu-central-1.amazonaws.com/production",
  },
  e2e: {
    baseUrl: process.env.INDEX_URL,
    specPattern: 'cypress/**/**/*.cy.{js,jsx,ts,tsx}',
    defaultCommandTimeout: 30000,
  },
});
