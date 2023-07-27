import { isIPAddress, isAddress } from "../../utils/validation.js";
import { OperationType } from "../../types/operation.js";
import { TimeStamp } from "../../utils/time.js";
import { TransferCalldata, GovernanceCallData } from "./calldata.js";
import { CryptoProposal, BizProposal } from "./proposal.js";
import { CancelProposalFact } from "./cancel.js";
import { CreateDAOFact } from "./create.js";
import { PostSnapFact } from "./snapAfter.js";
import { ExecuteFact } from "./execute.js";
import { PreSnapFact } from "./snapBefore.js";
import { ProposeFact } from "./propose.js";
import { RegisterFact } from "./register.js";
import { VoteFact } from "./vote.js";
import daoInfo from "./information.js";
export class Dao {
    constructor(networkID, provider) {
        this._networkID = "";
        this._node = "";
        this._contractAddress = "";
        this._serviceID = "";
        this._setNode(provider);
        this._setChain(networkID);
    }
    _setNode(provider) {
        if (isIPAddress(provider)) {
            this._node = provider;
        }
    }
    _setChain(networkID) {
        this._networkID = networkID;
    }
    setContractAddress(contractAddress) {
        if (this._contractAddress !== contractAddress &&
            isAddress(contractAddress)) {
            this._contractAddress = contractAddress;
            console.log("Contract address is changed : ", this._contractAddress);
        }
        else {
            console.error("This is invalid address type");
        }
    }
    setServiceId(serviceId) {
        if (this._serviceID !== serviceId) {
            this._serviceID = serviceId;
            console.log("DAO ID is changed : ", this._serviceID);
        }
    }
    getContractAddress() {
        return this._contractAddress.toString();
    }
    getServiceId() {
        return this._serviceID.toString();
    }
    /** daoData object
     daoData = {
          serviceId: string,
          option: string "crypto" or "biz",
          voteToken: string,
          threshold: number,
          fee: number,
          proposers: string[],
          waitingTime: number,
          registrationPeriod: number,
          preSnapPeriod: number,
          votingPeriod: number,
          postSnapPeriod: number,
          executionDelay: number,
          turnout: number,
          quorum: number,
     }
    */
    createDAOService(sender, data, currency) {
        this.setServiceId(data.serviceId);
        const token = new TimeStamp().UTC();
        const fact = new CreateDAOFact(token, sender, this._contractAddress, this._serviceID, data.option, data.voteToken, data.threshold, data.fee, data.proposers, data.waitingTime, data.registrationPeriod, data.preSnapPeriod, data.votingPeriod, data.postSnapPeriod, data.executionDelay, data.turnout, data.quorum, currency);
        return new OperationType(this._networkID, fact);
    }
    formTransferCalldata(sender, receiver, currency, amount) {
        return new TransferCalldata(sender, receiver, currency, amount);
    }
    /** policyData = {
          voteToken: string,
          threshold: number,
          fee: number,
          proposers: string[],
          waitingTime: number,
          registrationPeriod: number,
          preSnapPeriod: number,
          votingPeriod: number,
          postSnapPeriod: number,
          executionDelay: number,
          turnout: number,
          quorum: number
        }
     */
    formSetPolicyCalldata(policyData) {
        return new GovernanceCallData(policyData);
    }
    writeCryptoProposal(proposer, startTime, calldata) {
        return new CryptoProposal(proposer, startTime, calldata);
    }
    writeBizProposal(proposer, startTime, url, hash, voteOptions) {
        return new BizProposal(proposer, startTime, url, hash, voteOptions);
    }
    propose(sender, proposalId, proposal, currency) {
        const token = new TimeStamp().UTC();
        const fact = new ProposeFact(token, sender, this._contractAddress, this._serviceID, proposalId, proposal, currency);
        return new OperationType(this._networkID, fact);
    }
    register(sender, proposalId, delegator, currency) {
        const token = new TimeStamp().UTC();
        const fact = new RegisterFact(token, sender, this._contractAddress, this._serviceID, proposalId, delegator, currency);
        return new OperationType(this._networkID, fact);
    }
    cancel(sender, proposalId, currency) {
        const token = new TimeStamp().UTC();
        const fact = new CancelProposalFact(token, sender, this._contractAddress, this._serviceID, proposalId, currency);
        return new OperationType(this._networkID, fact);
    }
    snapBeforeVoting(sender, proposalId, currency) {
        const token = new TimeStamp().UTC();
        const fact = new PreSnapFact(token, sender, this._contractAddress, this._serviceID, proposalId, currency);
        return new OperationType(this._networkID, fact);
    }
    castVote(sender, proposalId, voteOption, currency) {
        const token = new TimeStamp().UTC();
        const fact = new VoteFact(token, sender, this._contractAddress, this._serviceID, proposalId, voteOption, currency);
        return new OperationType(this._networkID, fact);
    }
    snapAfterVoting(sender, proposalId, currency) {
        const token = new TimeStamp().UTC();
        const fact = new PostSnapFact(token, sender, this._contractAddress, this._serviceID, proposalId, currency);
        return new OperationType(this._networkID, fact);
    }
    execute(sender, proposalId, currency) {
        const token = new TimeStamp().UTC();
        const fact = new ExecuteFact(token, sender, this._contractAddress, this._serviceID, proposalId, currency);
        return new OperationType(this._networkID, fact);
    }
    async getServiceInfo(serviceId) {
        let daoId = this._serviceID;
        if (serviceId !== undefined) {
            daoId = serviceId;
        }
        const res = await daoInfo.getServiceInfo(this._node, this._contractAddress, daoId);
        return res.data;
    }
    async getProposalInfo(serviceId, proposalId) {
        const res = await daoInfo.getProposalInfo(this._node, this._contractAddress, serviceId, proposalId);
        return res.data;
    }
    async getDelegatorInfo(serviceId, proposalId, delegator) {
        const res = await daoInfo.getDelegatorInfo(this._node, this._contractAddress, serviceId, proposalId, delegator);
        return res.data;
    }
    async getVoterInfo(serviceId, proposalId, voter) {
        const res = await daoInfo.getVoterInfo(this._node, this._contractAddress, serviceId, proposalId, voter);
        return res.data;
    }
    async getVotingResult(serviceId, proposalId) {
        const res = await daoInfo.getVotingResult(this._node, this._contractAddress, serviceId, proposalId);
        return res.data;
    }
}
//# sourceMappingURL=index.js.map