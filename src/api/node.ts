import axios from "axios"
import { IP } from "../types"

async function getNode(api: string | IP) {
    return await axios.get(`${IP.from(api).toString()}/`)
}

export {
    getNode,
}