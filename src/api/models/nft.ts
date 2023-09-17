import axios from "axios"
import { ContractID } from "../../common"
import { Address } from "../../key"
import { Big, IP } from "../../types"

const url = (
    api: string | IP, 
    contract: string | Address, 
    collection: string | ContractID,
) => `${IP.from(api).toString()}/nft/${Address.from(contract).toString()}/collection/${ContractID.from(collection).toString()}`

async function getNFT(
    api: string | IP,
    contract: string | Address,
    collection: string | ContractID,
    nftID: string | number | Big,
) {
    return await axios.get(`${url(api, contract, collection)}/${nftID}`)
}

async function getNFTs(
    api: string | IP,
    contract: string | Address,
    collection: string | ContractID,
) {
    return await axios.get(`${url(api, contract, collection)}/nfts`)
}

async function getCollection(
    api: string | IP,
    contract: string | Address,
    collection: string | ContractID,
) {
    return await axios.get(`${url(api, contract, collection)}`)
}

async function getAccountOperators(
    api: string | IP,
    contract: string | Address,
    collection: string | ContractID,
    account: string | Address,
) {
    return await axios.get(`${url(api, contract, collection)}/account/${Address.from(account).toString()}/operators`)
}

export {
    getNFT,
    getNFTs,
    getCollection,
    getAccountOperators,
}