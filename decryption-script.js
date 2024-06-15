require('dotenv').config();
const fs = require('fs');
const CryptoJS = require('crypto-js');
const { Client } = require('@hashgraph/sdk');

const encryptedData = JSON.parse(fs.readFileSync('encryptedCredentials.json'));

const passphrase = process.env.PASSPHRASE;

const decryptedAccountId = CryptoJS.AES.decrypt(encryptedData.accountId, passphrase).toString(CryptoJS.enc.Utf8);
const decryptedPrivateKey = CryptoJS.AES.decrypt(encryptedData.privateKey, passphrase).toString(CryptoJS.enc.Utf8);

const client = Client.forTestnet();
client.setOperator(decryptedAccountId, decryptedPrivateKey);

console.log('Client operator set successfully');
