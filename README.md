# 🪙 Ethers Send Transaction

A simple Node.js script for sending **ETH transactions** on any Ethereum-compatible network using **ethers.js**.  
Supports .env configuration and CLI arguments for flexible testing and automation.

---

## 🚀 Features

- Send ETH from one wallet to another
- Uses [ethers.js](https://docs.ethers.org/) for blockchain interaction
- Loads environment variables via `.env`
- CLI interface for specifying recipient and amount
- Detailed error handling and console feedback

---

## 🧰 Requirements

- Node.js (v18 or higher)
- npm or yarn
- [MetaMask](https://metamask.io/) wallet (for creating accounts)
- [Infura](https://infura.io/) account (for RPC access)
- Test ETH (e.g. from [Google Cloud Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia))

---

## ⚙️ Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yarzhuravlov/web3-eth-transfer.git
   cd web3-eth-transfer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the project root:

   ```
   RPC_URL=https://sepolia.infura.io/v3/your_project_id
   ```

   ⚠️ **Never commit your `.env` file or private key to GitHub!**

4. **Run the script**

   ```bash
   node index.js -r <receiver_address> -p <sender_private_key> -a <amount> 
   ```

   Example:

   ```bash
   node index.js -r 0xAbC1234567890defABC1234567890defABC1234 -a 0.01 -p 0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
   ```

5. **Optionally use help command**
```bash
node index.js --help
```

---

## 🧪 How I Tested It

1. Created **two accounts** in MetaMask (`Account 1` and `Account 2`)
2. Switched MetaMask to the **SepoliaETH** test network
3. Received **test tokens** to Account 1 using the [Google Cloud Web3 Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
4. Created an **Infura account**, set up a new project, and copied the **Sepolia RPC URL**
5. Added the `RPC_URL` and Account 1’s **private key** to `.env`
6. Used Account 2’s **public address** as the transaction receiver
7. Ran the script and confirmed the transaction appeared in both MetaMask and [Sepolia Etherscan](https://sepolia.etherscan.io/)

---

## 🧾 Example Output

```
Sending 0.01 ETH to 0xAbC1234567890defABC1234567890defABC1234...
Transaction sent!
TX hash: 0x4b9e...d7a1e
Confirmed in block: 5632198
```

---

## ⚠️ Disclaimer

This project is for **educational and testing purposes only**.
Never use your real mainnet private keys in scripts or upload them to public repositories.

---

## 📜 License

MIT © 2025 Yaroslav Zhuravlov
