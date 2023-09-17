import axios from "axios"
import { ContractID } from "../../common"
import { Address } from "../../key"
import { Big, IP } from "../../types"

const url = (
    api: string | IP, 
    contract: string | Address, 
    service: string | ContractID,
) => `${IP.from(api).toString()}/timestamp/${Address.from(contract).toString()}/service/${ContractID.from(service).toString()}`

async function getService(
    api: string | IP, 
    contract: string | Address,
    service: string | ContractID,
) {
    return await axios.get(`${url(api, contract, service)}`)
}

async function getTimeStamp(
    api: string | IP, 
    contract: string | Address,
    service: string | ContractID,
    projectID: string,
    requestTimeStamp: string | number | Big,
) {
    return await axios.get(`${url(api, contract, service)}/project/${projectID}/id/${Big.from(requestTimeStamp).toString()}`)
}

export {
    getService,
    getTimeStamp,
}