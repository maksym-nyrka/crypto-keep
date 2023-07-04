### Technologies used:
**Frontend:** Bootstrap, Webpack, Sweetalert2, Animate.css.  
**Backend:** Express.js, Node.js, web3.js, MongoDB, Swagger, AWS S3, AWS CloundFront, AWS API Gateway, AWS EC2, AWS Cerfiticates, Certbot, pm2, GoDaddy.   
**Tests:** Cypress, Mocha, Chai, axios.  

### How to run:
1. These env variables should be present (could be in .env file): MONGO_USERNAME, MONGO_PASSWORD, MONGO_CLUSTER_URL, INFURA_API_TOKEN, BLOCKCYPHER_API_TOKEN, COMPUTER_NAME (name of local machine for FE server), CLIENT_URL (is 'http://<COMPUTER_NAME>:8080'), JWT_SECRET, API_HOST (where's backend server hosted).
2. Private key to HTTPS Sertificate 'server.key' in root folder must be present
3. To start backend server: `npm run backend:start`  
4. To start frontend: `npm run frontend:start`
