const { ethers } = require("ethers");
const dotenv = require("dotenv");
const getArgs = require("./src/getArgs");
const { parseAmount, parseAddress, parsePrivateKey } = require("./src/parsers");

dotenv.config();

async function sendToken(sender_private_key, to, amount) {
    try {
        if (!process.env.RPC_URL) {
            throw new Error("Missing RPC_URL in .env");
        }

        parsePrivateKey(sender_private_key);
        parseAddress(to);
        parseAmount(amount);

        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

        const wallet = new ethers.Wallet(sender_private_key, provider);

        const balance = await provider.getBalance(wallet.address);
        const amountInWei = ethers.parseEther(amount.toString());

        if (balance < amountInWei) {
            throw new Error(
                `Insufficient balance: have ${ethers.formatEther(
                    balance
                )} ETH, need ${amount} ETH`
            );
        }

        const tx = {
            to,
            value: amountInWei,
        };

        console.log(`Sending ${amount} ETH to ${to}...`);

        const txResponse = await wallet.sendTransaction(tx);
        console.log("Transaction sent");
        console.log("TX hash: ", txResponse.hash);

        const receipt = await txResponse.wait();
        console.log("Confirmed in block: ", receipt.blockNumber);
    } catch (error) {
        if (error.code === "NETWORK_ERROR") {
            console.error(" - Network connection failed. Check your RPC_URL.");
        } else if (error.code === "INSUFFICIENT_FUNDS") {
            console.error(
                " - Wallet doesn't have enough ETH to cover gas + amount."
            );
        } else if (error.code === "INVALID_ARGUMENT") {
            console.error(" - Invalid argument (check address or amount).");
        } else if (error.code === "UNPREDICTABLE_GAS_LIMIT") {
            console.error(" - Transaction may fail or require too much gas.");
        } else {
            console.error(error);
        }
    }
}

const args = getArgs();

sendToken(args.private_key, args.receiver, args.amount);
