require('dotenv').config()

const express = require('express');
const https = require('https');
const fs = require('fs');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const Application = require("./core/Application");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../swagger.json');

const privateKey = fs.readFileSync('./server.key', 'utf8');
const certificate = fs.readFileSync('./server.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};
const jwtSecret = process.env.JWT_SECRET

const server = express();
server.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
const app = new Application();

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('Unauthorized');
    }
    try {
        req.user = jwt.verify(token, jwtSecret);
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};

server.get("/blockchains/:currencyTicker", verifyToken, async (req, res) => {
    try {
        let currency = req.params['currencyTicker'];
        console.log('get /blockchains/' + currency);

        if (!app.isValidCurrency(currency)) {
            res.status(404);
            res.send('Currency not found');
        }
        app.setCurrency(currency);

        let response = {};
        response['imagePath'] = await app.getCurrencyImage();
        response['fullName'] = await app.getCurrencyFullName();
        response['address'] = await app.getCurrentAddress();
        response['balance'] = await app.getCurrentBalance();

        res.json(response);
    } catch (e) {
        console.error(e);
    }
})

server.post("/loginWithMnemonic/", async (req, res) => {
    try {
        console.log('post /loginWithMnemonic/');
        console.log(req.body);

        const mnemonic = req.body["mnemonic"];
        await app.setMnemonic(mnemonic);

        let result = {};
        result.status = 'success'
        let token = jwt.sign({user: 'crypto-keep'}, jwtSecret);
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            domain: process.env.API_HOST
        });
        res.json(result);
    } catch (e) {
        console.error(e);
    }
})


server.post("/sendCurrency/", verifyToken, async (req, res) => {
    try {
        console.log('post /sendCurrency/');
        console.log(req.body);

        const amount = req.body["amount"];
        const to = req.body["to"];
        let result = await app.sendCurrency(to, amount);

        if (result.status === 'error') {
            res.status(400);
        }
        res.json(result);
    } catch (e) {
        console.error(e);
    }
})

const httpServer = http.createServer(server);
const httpsServer = https.createServer(credentials, server);

httpServer.listen(8081, () => {
    console.log("Server started on port 8081");
})

httpsServer.listen(8443, () => {
    console.log("Server started on port 8443");
})
