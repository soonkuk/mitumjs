import axios from "axios"
import { ContractID } from "../../common"
import { Address } from "../../key"
import { IP } from "../../types"

const url = (
    api: string | IP, 
    contract: string | Address, 
    service: string | ContractID,
) => `${IP.from(api).toString()}/did/${Address.from(contract).toString()}/issuer/${ContractID.from(service).toString()}`

async function getService(api: string | IP, contract: string | Address, service: string | ContractID) {
    return await axios.get(url(api, contract, service))
}

async function getCredential(
    api: string | IP, 
    contract: string | Address, 
    service: string | ContractID,
    templateID: string,
    credentialID: string,
) {
    return await axios.get(
        `${url(api, contract, service)}/template/${templateID}/credential/${credentialID}`
    )
}

async function getTemplate(
    api: string | IP,
    contract: string | Address,
    service: string | ContractID,
    templateID: string,
) {
    return await axios.get(`${url(api, contract, service)}/template/${templateID}`)
}

async function getCredentials(
    api: string | IP,
    contract: string | Address,
    service: string | ContractID,
    templateID: string,
) {
    return await axios.get(`${url(api, contract, service)}/template/${templateID}/credentials`)
}

async function getCredentialByHolder(
    api: string | IP,
    contract: string | Address,
    service: string | ContractID,
    holder: string | Address,
) {
    return await axios.get(`${url(api, contract, service)}/holder/${Address.from(holder).toString()}`)
}

export default {
    getService,
    getCredential,
    getTemplate,
    getCredentials,
    getCredentialByHolder,
}