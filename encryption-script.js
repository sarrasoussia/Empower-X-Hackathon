require('dotenv').config();
const { Client } = require('@hashgraph/sdk');

const myAccountId = process.env.HEDERA_ACCOUNT_ID;
const myPrivateKey = process.env.HEDERA_PRIVATE_KEY;

if (!myAccountId || !myPrivateKey) {
  throw new Error('Environment variables HEDERA_ACCOUNT_ID and HEDERA_PRIVATE_KEY must be set');
}

const client = Client.forTestnet();
client.setOperator(myAccountId, myPrivateKey);

console.log('Client operator set successfully');
