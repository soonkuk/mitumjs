import { CreateDAOFact } from "./create-dao"
import { ProposeFact } from "./propose"
import { CancelProposalFact } from "./cancel-proposal"
import { RegisterFact } from "./register"
import { PreSnapFact } from "./pre-snap"
import { PostSnapFact } from "./post-snap"
import { VoteFact } from "./vote"
import { ExecuteFact } from "./execute"

import { DAOPolicy } from "./policy"
import { Whitelist } from "./whitelist"
import { CryptoProposal, BizProposal } from "./proposal"
import { TransferCalldata, GovernanceCalldata } from "./proposal"

import { ContractGenerator, Operation } from "../base"

import { Address } from "../../key"
import { Amount, CurrencyID } from "../../common"
import { contract, getAPIData } from "../../api"
import { Big, HintedObject, IP, LongString, TimeStamp } from "../../types"

type policyData = {
    token: string | CurrencyID,
    threshold: string | number | Big,
    fee: string | number | Big,
    proposers: (string | Address)[],
    proposalReviewPeriod: string | number | Big,
    registrationPeriod: string | number | Big,
    preSnapshotPeriod: string | number | Big,
    votingPeriod: string | number | Big,
    postSnapshotPeriod: string | number | Big,
    executionDelayPeriod: string | number | Big,
    turnout: string | number | Big,
    quorum: string | number | Big,
}

type daoData = policyData & {
    option: "crypto" | "biz"
}

export class DAO extends ContractGenerator {
    constructor(
        networkID: string,
        contract?: string | Address,
        api?: string | IP,
    ) {
        super(networkID, contract, api)
    }

    createService(
        sender: string | Address,
        data: daoData,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new CreateDAOFact(
                TimeStamp.new().UTC(),
                sender,
                this.contract,
                data.option,
                data.token,
                data.threshold,
                data.fee,
                new Whitelist(true, data.proposers.map(a => Address.from(a))),
                data.proposalReviewPeriod,
                data.registrationPeriod,
                data.preSnapshotPeriod,
                data.votingPeriod,
                data.postSnapshotPeriod,
                data.executionDelayPeriod,
                data.turnout,
                data.quorum,
                currency
            )
        )
    }

    formTransferCalldata(
        sender: string | Address,
        receiver: string | Address,
        currency: string | CurrencyID,
        amount: string | number | Big,
    ): HintedObject {
        return new TransferCalldata(sender, receiver, new Amount(currency, amount))
    }

    formSetPolicyCalldata(data: policyData): HintedObject {
        return new GovernanceCalldata(
            new DAOPolicy(
                data.token,
                data.threshold,
                data.fee,
                new Whitelist(true, data.proposers.map(a => Address.from(a))),
                data.proposalReviewPeriod,
                data.registrationPeriod,
                data.preSnapshotPeriod,
                data.votingPeriod,
                data.postSnapshotPeriod,
                data.executionDelayPeriod,
                data.turnout,
                data.quorum,
            )
        )
    }

    writeCryptoProposal(proposer: string, startTime: number, calldata: TransferCalldata | GovernanceCalldata) {
        return new CryptoProposal(proposer, startTime, calldata)
    }

    writeBizProposal(
        proposer: string | Address,
        startTime: string | number | Big,
        url: string | LongString,
        hash: string | LongString,
        options: string | number | Big,
    ) {
        return new BizProposal(proposer, startTime, url, hash, options);
    }

    propose(
        sender: string | Address,
        proposalID: string,
        proposal: CryptoProposal | BizProposal,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new ProposeFact(
                TimeStamp.new().UTC(),
                sender,
                this.contract,
                proposalID,
                proposal,
                currency
            )
        )
    }

    register(
        sender: string | Address,
        proposalID: string,
        delegator: string | Address,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new RegisterFact(
                TimeStamp.new().UTC(),
                sender,
                this.contract,
                proposalID,
                delegator,
                currency,
            )
        )
    }

    cancel(
        sender: string | Address,
        proposalID: string,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new CancelProposalFact(
                TimeStamp.new().UTC(),
                sender,
                this.contract,
                proposalID,
                currency
            )
        )
    }

    snapBeforeVoting(
        sender: string | Address,
        proposalID: string,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new PreSnapFact(
                TimeStamp.new().UTC(),
                sender,
                this.contract,
                proposalID,
                currency
            )
        )
    }

    castVote(
        sender: string | Address,
        proposalID: string,
        voteOption: number,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new VoteFact(
                TimeStamp.new().UTC(),
                sender,
                this.contract,
                proposalID,
                voteOption,
                currency
            )
        )
    }

    snapAfterVoting(
        sender: string | Address,
        proposalID: string,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new PostSnapFact(
                TimeStamp.new().UTC(),
                sender,
                this.contract,
                proposalID,
                currency
            )
        )
    }

    execute(
        sender: string | Address,
        proposalID: string,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new ExecuteFact(
                TimeStamp.new().UTC(),
                sender,
                this.contract,
                proposalID,
                currency
            )
        )
    }

    async getServiceInfo() {
        return await getAPIData(() => contract.dao.getService(this.api, this.contract))
    }

    async getProposalInfo(proposalID: string) {
        return await getAPIData(() => contract.dao.getProposal(this.api, this.contract, proposalID))
    }

    async getDelegatorInfo(proposalID: string, delegator: string | Address) {
        return await getAPIData(() => contract.dao.getDelegator(this.api, this.contract, proposalID, delegator))
    }

    async getVoterInfo(proposalID: string, voter: string | Address) {
        return await getAPIData(() => contract.dao.getVoter(this.api, this.contract, proposalID, voter))
    }

    async getVotingResult(proposalID: string) {
        return await getAPIData(() => contract.dao.getVotingResult(this.api, this.contract, proposalID))
    }
}