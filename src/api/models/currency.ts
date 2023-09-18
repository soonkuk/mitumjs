import axios from "axios"
import { IP } from "../../types"
import { CurrencyID } from "../../common"

async function getCurrencies(api: string | IP) {
    return await axios.get(`${IP.from(api).toString()}/currency`)
}

async function getCurrency(api: string | IP, currency: string | CurrencyID) {
    return await axios.get(`${IP.from(api).toString()}/currency/${CurrencyID.from(currency).toString()}`)
}

export default {
    getCurrencies,
    getCurrency,
}