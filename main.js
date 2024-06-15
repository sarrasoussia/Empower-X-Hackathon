const crypto = require('crypto');
const diplomaData = JSON.stringify({ name: "Sarra Sou", degree: "Computer Science Engineer", date: "2025-06-01" });
const diplomaHash = crypto.createHash('sha256').update(diplomaData).digest('hex');

const { Client, ConsensusMessageSubmitTransaction } = require("@hashgraph/sdk");

const client = Client.forTestnet();
client.setOperator(myAccountId, myPrivateKey);

async function submitDiplomaHash() {
  const transaction = new ConsensusMessageSubmitTransaction()
    .setTopicId(topicId)
    .setMessage(diplomaHash);

  const response = await transaction.execute(client);
  const receipt = await response.getReceipt(client);

  console.log(`Transaction status: ${receipt.status}`);
}
submitDiplomaHash();
