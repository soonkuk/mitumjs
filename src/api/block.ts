import axios from "axios"
import { Big, IP } from "../types"

async function getBlocks(api: string | IP) {
    return await axios.get(`${IP.from(api).toString()}/block/manifests`)
}

async function getBlockByHeight(api: string | IP, height: string | number | Big) {
    return await axios.get(`${IP.from(api).toString()}/block/${Big.from(height).toString()}/manifest`)
}

async function getBlockByHash(api: string | IP, hash: string) {
    return await axios.get(`${IP.from(api).toString()}/block/${hash}/manifest`)
}

export default {
    getBlocks,
    getBlockByHeight,
    getBlockByHash,
}