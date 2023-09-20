import axios from "axios"
import { ContractID } from "../../common"
import { Address } from "../../key"
import { Big, IP } from "../../types"

const url = (
    api: string | IP, 
    contract: string | Address, 
) => `${IP.from(api).toString()}/nft/${Address.from(contract).toString()}`

async function getNFT(
    api: string | IP,
    contract: string | Address,
    nftID: string | number | Big,
) {
    return await axios.get(`${url(api, contract)}/${nftID}`)
}

async function getNFTs(
    api: string | IP,
    contract: string | Address,
) {
    return await axios.get(`${url(api, contract)}/nfts`)
}

async function getCollection(
    api: string | IP,
    contract: string | Address,
) {
    return await axios.get(`${url(api, contract)}/collection`)
}

async function getAccountOperators(
    api: string | IP,
    contract: string | Address,
    account: string | Address,
) {
    return await axios.get(`${url(api, contract)}/account/${Address.from(account).toString()}/operators`)
}

export default {
    getNFT,
    getNFTs,
    getCollection,
    getAccountOperators,
}