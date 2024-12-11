import {ethers} from "ethers";

const {getDefaultProvider} = ethers;

async function main() {
    try {
        const provider = getDefaultProvider("sepolia");
        // const provider = new ethers.providers.Web3Provider(web3Provider);
        // console.log(provider);

        const balance = await provider.getBalance("0xBf49Bd2B2c2f69c53A40306917112945e27577A4");
        console.log("Balance:", balance?.toString());

        const network = await provider.getNetwork();
        console.log("Network fetched:",  JSON.stringify(network, null, 2));

        const blockNumber = await provider.getBlockNumber();
        console.log("Block Number:", blockNumber);
        
        // example address you can replace
        const transactionCount = await provider.getTransactionCount("0xBf49Bd2B2c2f69c53A40306917112945e27577A4");
        console.log("Transaction Count:", transactionCount);

        const feeData = await provider.getFeeData();
        console.log("FeeData:", feeData);

        const block = await provider.getBlock(blockNumber);
        console.log("Block:", block);
        
        // SimpleCryptoKitties contract deployed on sepolia and we will interact with
        const code = await provider.getCode("0xdaCc865922356723C01305F819E65ffB1b14520D");
        console.log("Code:", code);

    } catch (error) {
        console.error("Error:", error);
    }
}


main();