import axios from "axios"
import { Address } from "../key"
import { Big, HintedObject, IP } from "../types"

async function getOperations(api: string | IP) {
    return await axios.get(`${IP.from(api).toString()}/block/operations`)
}

async function getOperation(api: string | IP, hash: string) {
    return await axios.get(`${IP.from(api).toString()}/block/operation/${hash}`)
}

async function getBlockOperationsByHeight(api: string | IP, height: string | number | Big) {
    return await axios.get(`${IP.from(api).toString()}/block/${Big.from(height).toString()}/operations`)
}

async function getBlockOperationsByHash(api: string | IP, hash: string) {
    return await axios.get(`${IP.from(api).toString()}/block/${hash}/operations`)
}

async function getAccountOperations(api: string | IP, address: string | Address) {
    return await axios.get(`${IP.from(api).toString()}/account/${Address.from(address).toString()}/operations`)
}

async function send(api: string | IP, operation: HintedObject | string, config?: { [i: string]: any }) {
    return await axios.post(`${IP.from(api).toString()}/builder/send`, JSON.stringify(operation), config)
}

export default {
    getOperations,
    getOperation,
    getBlockOperationsByHeight,
    getBlockOperationsByHash,
    getAccountOperations,
    send,
}