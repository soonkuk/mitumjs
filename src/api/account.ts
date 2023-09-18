import axios from "axios"
import { IP } from "../types";
import { Address, Key } from "../key";

async function getAccount(api: string | IP, address: string | Address) {
    return await axios.get(`${IP.from(api).toString()}/account/${Address.from(address).toString()}`)
}

async function getAccountByPublicKey(api: string | IP, publicKey: string | Key) {
    return await axios.get(`${IP.from(api).toString()}/accounts?publickey=${Key.from(publicKey).toString()}`)
}

export default {
    getAccount,
    getAccountByPublicKey,
}