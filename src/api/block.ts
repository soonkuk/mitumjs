import axios from "axios"
import { Big, IP } from "../types"

async function getBlocks(api: string | IP) {
    return await axios.get(`${IP.from(api)}/block/manifests`)
}

async function getBlockByHeight(api: string | IP, height: string | number | Big) {
    return await axios.get(`${IP.from(api)}/block/${Big.from(height).toString()}/manifest`)
}

async function getBlockByHash(api: string | IP, hash: string) {
    return await axios.get(`${IP.from(api)}/block/${hash}/manifest`)
}

export {
    getBlocks,
    getBlockByHeight,
    getBlockByHash,
}