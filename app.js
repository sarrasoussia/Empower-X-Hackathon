import dotenv from 'dotenv';
dotenv.config();

import { Client, PrivateKey, AccountId, TokenCreateTransaction, TokenType, TokenSupplyType, TokenMintTransaction } from "@hashgraph/sdk";
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

// Hedera Hashgraph account details from environment variables
const operatorAccountId = (process.env.MY_ACCOUNT_ID);
const operatorPrivateKey = (process.env.MY_PRIVATE_KEY);

if (!operatorAccountId || !operatorPrivateKey) {
    console.error("Missing OPERATOR_ACCOUNT_ID or OPERATOR_PRIVATE_KEY in environment variables");
    process.exit(1);
}

// Initialize Hedera client for Testnet
const client = Client.forTestnet();
client.setOperator(operatorAccountId, operatorPrivateKey);

// Endpoint to issue a new diploma NFT
app.post("/issueDiploma", async (req, res) => {
    try {
        const { studentName, degree, dateOfGraduation } = req.body;

        // Create a new token
        const tokenCreateTx = new TokenCreateTransaction()
            .setTokenName("DiplomaToken")
            .setTokenSymbol("DIP")
            .setTokenType(TokenType.NonFungibleUnique)
            .setSupplyType(TokenSupplyType.Finite)
            .setMaxSupply(1)
            .setTreasuryAccountId(operatorAccountId)
            .freezeWith(client);

        const tokenCreateSign = await tokenCreateTx.sign(operatorPrivateKey);
        const tokenCreateSubmit = await tokenCreateSign.execute(client);
        const tokenCreateRx = await tokenCreateSubmit.getReceipt(client);
        const tokenId = tokenCreateRx.tokenId;

        console.log(`Created Token with ID: ${tokenId}`);

        // Mint a new NFT
        const mintTx = new TokenMintTransaction()
            .setTokenId(tokenId)
            .setMetadata([Buffer.from(JSON.stringify({ studentName, degree, dateOfGraduation }))])
            .freezeWith(client);

        const mintSign = await mintTx.sign(operatorPrivateKey);
        const mintSubmit = await mintSign.execute(client);
        const mintRx = await mintSubmit.getReceipt(client);

        console.log(`Minted NFT with ID: ${mintRx.serials[0].low}`);

        const token = `${tokenId}:${mintRx.serials[0].low}`;
        res.status(200).json({ token });
    } catch (error) {
        console.error("Error issuing diploma:", error);
        res.status(500).send("Error issuing diploma");
    }
});

// Endpoint to verify a diploma NFT
app.get("/verifyDiploma/:token", async (req, res) => {
    try {
        const [tokenId, serial] = req.params.token.split(':');

        // Get the NFT metadata (This is a simplified example, you would fetch and decode metadata in a real application)
        const tokenInfo = await client.getTokenInfo(tokenId);
        const serialNumber = parseInt(serial);
        const metadata = tokenInfo.customFees[serialNumber - 1]; // Assuming metadata is stored as custom fees, for example

        const diplomaData = JSON.parse(Buffer.from(metadata).toString());
        res.status(200).json(diplomaData);
    } catch (error) {
        console.error("Error verifying diploma:", error);
        res.status(500).send("Error verifying diploma");
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
