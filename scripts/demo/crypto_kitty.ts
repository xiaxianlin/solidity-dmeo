import { ethers, BigNumber } from 'ethers'
const ADDRESS = '0xDA0bab807633f07f013f94DD0E6A4F96F8742B53'

const getProvider = async () => {
    const metadata = JSON.parse(
        await remix.call(
            'fileManager',
            'getFile',
            `browser/contracts/artifacts/SimpleCryptoKitties.json`,
        ),
    )
    const provider = new ethers.providers.Web3Provider(web3Provider)
    return { metadata, provider }
}

const test00 = async () => {
    try {
        const { metadata, provider } = await getProvider()

        const readOnlyContract = new ethers.Contract(
            ADDRESS,
            metadata.abi,
            provider,
        )
        const name = await readOnlyContract.name()
        console.log('Token Name:', name)
    } catch (error) {
        console.error('Error in contract interaction:', error)
    }
}

const test01 = async () => {
    try {
        const { metadata, provider } = await getProvider()
        const signer = provider.getSigner()
        console.log("signer:", signer);
        const contract = new ethers.Contract(ADDRESS, metadata.abi, signer)
        const Kitty = await contract.kitties(0)
        console.log('Kitty 1 Genes:', Kitty.genes.toString())
        console.log('Kitty 1 BirthTime:', Kitty.birthTime.toString())
        console.log('Kitty 1 MomId:', Kitty.momId.toString())
        console.log('Kitty 1 DadId:', Kitty.dadId.toString())
        console.log('Kitty 1 Generation:', Kitty.generation.toString())

        // Get current gas price and set gas limit
        const feeData = await provider.getFeeData()
        console.log(
            `Current gas price: ${ethers.utils.formatUnits(
                feeData.gasPrice,
                'gwei',
            )} gwei`,
        )
        const gasLimit = 300000

        // Create a new Generation 0 kitty
        console.log('Attempting to create a new Generation 0 kitty...')
        const createTxResponse = await contract.createKittyGen0({
            gasLimit,
            gasPrice: feeData.gasPrice,
        })
        console.log('Transaction sent, waiting for receipt...')
        const receipt = await createTxResponse.wait()
        // console.log("Transaction receipt:", receipt);

        // Get newKitty's tokenId
        const newKittyId = BigNumber.toBigInt(receipt.logs[0].topics[3])

        // Fetch the new kitty's details
        const newKitty = await contract.kitties(newKittyId.toString())
        console.log('New Kitty TokenId:', newKittyId.toString())
        console.log('New Kitty Genes:', newKitty.genes.toString())
        console.log('New Kitty BirthTime:', newKitty.birthTime.toString())
        console.log('New Kitty MomId:', newKitty.momId.toString())
        console.log('New Kitty DadId:', newKitty.dadId.toString())
        console.log('New Kitty Generation:', newKitty.generation.toString())
    } catch (error) {
        console.error('Error in contract interaction:', error)
    }
}

const main = async () =>{
    await test00()
    await test01()
}

main()

