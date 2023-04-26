class FetchService {

    fetchBlockchainData(currency, key) {
        return fetch(`${process.env.BACKEND_SERVER}/blockchains/${currency}`)
            .then(response => response.json())
            .then(data => {
                // console.log("Received data from server:", data[key]);
                return data[key];
            })
            .catch(err => console.log(err));
    }
}

module.exports = FetchService;
