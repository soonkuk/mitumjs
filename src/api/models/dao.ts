import axios from "axios"
import { ContractID } from "../../common"
import { Address } from "../../key"
import { IP } from "../../types"

const url = (
    api: string | IP, 
    contract: string | Address, 
    service: string | ContractID,
) => `${IP.from(api).toString()}/dao/${Address.from(contract).toString()}/service/${ContractID.from(service).toString()}`

async function getService(
    api: string | IP, 
    contract: string | Address,
    service: string | ContractID,
) {
    return await axios.get(`${url(api, contract, service)}`)
}

async function getProposal(
    api: string | IP, 
    contract: string | Address,
    service: string | ContractID,
    proposalID: string,
) {
    return await axios.get(`${url(api, contract, service)}/proposal/${proposalID}`)
}

async function getDelegator(
    api: string | IP, 
    contract: string | Address,
    service: string | ContractID,
    proposalID: string,
    delegator: string | Address,
) {
    return await axios.get(`${url(api, contract, service)}/proposal/${proposalID}/delegator/${Address.from(delegator).toString()}`)
}

async function getVoter(
    api: string | IP, 
    contract: string | Address,
    service: string | ContractID,
    proposalID: string,
    voter: string | Address,
) {
    return await axios.get(`${url(api, contract, service)}/pproposal/${proposalID}/voter/${Address.from(voter).toString()}`)
}

async function getVotingResult(
    api: string | IP, 
    contract: string | Address,
    service: string | ContractID,
    proposalID: string,
) {
    return await axios.get(`${url(api, contract, service)}/proposal/${proposalID}/votingpower`)
}

export default {
    getService,
    getProposal,
    getDelegator,
    getVoter,
    getVotingResult,
}