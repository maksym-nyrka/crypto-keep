const GET = 'GET';
const POST = 'POST';

class HttpService {

    postRequest(url, data, headers) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!headers) {
                    headers = {"Content-Type": "application/json"};
                }
                const result = await this.httpRequest(POST, url, data, headers);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        });
    }

    getRequest(url, data, headers) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.httpRequest(GET, url, data, headers);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        });
    }

    httpRequest(method, url, data, headers = {}) {
        return new Promise(async (resolve, reject) => {
            const options = {
                body: data,
                method: method,
                headers: headers,
                credentials: 'include'
            };
            fetch(url, options).then((res) => res.json())
                .then(data => resolve(data))
                .catch(e => reject(e));
        })
    }
}

module.exports = HttpService;
