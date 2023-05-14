const {MongoClient, ServerApiVersion} = require('mongodb');

const USERNAME = process.env.MONGO_USERNAME;
const PASSWORD = process.env.MONGO_PASSWORD;
const CLUSTER_URL = process.env.MONGO_CLUSTER_URL;

const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER_URL}/?retryWrites=true&w=majority`;
const DB_NAME = 'main';

class MongoDbClient {

    constructor() {
        this.client = new MongoClient(URL, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
    }

    async connect() {
       await this.getClient().connect();
    }

    getClient() {
        return this.client;
    }

    getDb(dbName = DB_NAME) {
        return this.getClient().db(dbName);
    }

    async getBlockchainData(key, currencyTicker) {
        try {
            await this.connect();
            const collection = this.getDb().collection('blockchains');
            const query = {ticker: currencyTicker};
            const result = await collection.findOne(query);

            return result[key];
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = MongoDbClient;
