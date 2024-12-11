import { ethers } from 'ethers'
const { toUtf8Bytes, RLP, hexlify, keccak256, sha512 } = ethers.utils
// transactionData
const transactionData = {
    assetId: 1,
    owner: '0xBf49Bd2B2c2f69c53A40306917112945e27577A4',
    description: 'fantastic token',
}

// Encode as a hexadecimal string
const assetIdHex = hexlify(BigInt(transactionData.assetId))
const owner = hexlify(BigInt(transactionData.owner))
// Convert to UTF-8 bytes
const descriptionBytes = toUtf8Bytes(transactionData.description)

// RLP encode the complete transaction data
const rlpEncodedTransaction = RLP.encode([assetIdHex, owner, descriptionBytes])

console.log(`RLP encoded transaction data: ${rlpEncodedTransaction}`)

console.log(`keccak256: ${keccak256(toUtf8Bytes('Hello, world!'))}`)
console.log(`sha512: ${sha512(toUtf8Bytes('Hello, world!'))}`)
