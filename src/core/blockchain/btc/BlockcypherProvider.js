class BlockcypherProvider {

    constructor() {
    }

    getBalance(address) {
        return new Promise(async (resolve, reject) => {
            try {
                let url = `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/balance`;
                let data = null;
                let method = "GET";
                let result = await this.getRequest(url, data, method);

                result = await result.json();

                let balance = result["final_balance"];

                resolve(balance);
            } catch (e) {
                reject(e);
            }
        })
    }

    getRequest(url, data, method, headers) {
        return new Promise(async (resolve, reject) => {
            if (!headers) {
                headers = {"Content-Type": "application/json"};
            }

            const options = {
                body: data,
                method: method,
                headers: headers
            };

            fetch(url, options).then(res => {
                resolve(res);
            }).catch(e => {
                reject(e);
            });
        })
    }
}

module.exports = BlockcypherProvider;
