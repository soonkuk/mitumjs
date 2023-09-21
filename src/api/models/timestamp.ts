import axios from "axios"

import { Address } from "../../key"
import { Big, IP } from "../../types"

const url = (
    api: string | IP, 
    contract: string | Address,
) => `${IP.from(api).toString()}/timestamp/${Address.from(contract).toString()}`

async function getService(
    api: string | IP, 
    contract: string | Address,
) {
    return await axios.get(`${url(api, contract)}/service`)
}

async function getTimeStamp(
    api: string | IP, 
    contract: string | Address,
    projectID: string,
    tid: string | number | Big,
) {
    return await axios.get(`${url(api, contract)}/project/${projectID}/id/${Big.from(tid).toString()}`)
}

export default {
    getService,
    getTimeStamp,
}