import { ethers } from 'ethers'
export const getProvider = () => {
    return new ethers.providers.Web3Provider(web3Provider)
}
