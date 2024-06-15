"# Empower-X-Hackathon" 

# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# download and install Node.js (you may need to restart the terminal)
nvm install 20

# verifies the right Node.js version is in the environment
node -v # should print `v20.14.0`

# verifies the right NPM version is in the environment
npm -v # should print `10.7.0`

# Isolate Hedera SDK in a Separate Project
npm init -y
npm install @hashgraph/sdk

-------------------------

The @grpc/grpc-js package has a moderate severity vulnerability related to memory allocation for incoming messages.
The specific issue is tracked in the GitHub advisory: GHSA-7v5v-9h63-cj86.

Fix Recommendations:
    Running npm audit fix --force will update @hashgraph/sdk to version 2.26.0, which addresses the vulnerability but is a breaking change.

Options to Address the Issue:

*Automatic Fix with Potential Breaking Changes: Run the following command to force an update and fix the vulnerabilities. Note that this might introduce breaking changes if @hashgraph/sdk is updated to a version with API changes:

    npm audit fix --force


*Or manually update @hashgraph/sdk to a version that does not have the vulnerability and test your application to ensure compatibility.
Update your package.json:

    "dependencies": {
    "@hashgraph/sdk": "^2.26.0"
    }
    Then run: npm install

-------------------

Storing confidential information such as your account ID and private key in an encrypted file is a good practice to enhance security:

1.    Install a package for encryption and decryption => npm install crypto-js
2.    Create an encryption/decryption script 
3.    Use env vars => npm install dotenv
