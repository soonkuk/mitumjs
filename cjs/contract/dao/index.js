"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dao = void 0;
const validation_js_1 = require("../../utils/validation.js");
const operation_js_1 = require("../../types/operation.js");
const time_js_1 = require("../../utils/time.js");
const calldata_js_1 = require("./calldata.js");
const proposal_js_1 = require("./proposal.js");
const cancel_js_1 = require("./cancel.js");
const create_js_1 = require("./create.js");
const snapAfter_js_1 = require("./snapAfter.js");
const execute_js_1 = require("./execute.js");
const snapBefore_js_1 = require("./snapBefore.js");
const propose_js_1 = require("./propose.js");
const register_js_1 = require("./register.js");
const vote_js_1 = require("./vote.js");
const information_js_1 = __importDefault(require("./information.js"));
class Dao {
    constructor(networkID, provider) {
        this._networkID = "";
        this._node = "";
        this._contractAddress = "";
        this._serviceID = "";
        this._setNode(provider);
        this._setChain(networkID);
    }
    _setNode(provider) {
        if ((0, validation_js_1.isIPAddress)(provider)) {
            this._node = provider;
        }
    }
    _setChain(networkID) {
        this._networkID = networkID;
    }
    setContractAddress(contractAddress) {
        if (this._contractAddress !== contractAddress &&
            (0, validation_js_1.isAddress)(contractAddress)) {
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
            console.log("Credential ID is changed : ", this._serviceID);
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
        const token = new time_js_1.TimeStamp().UTC();
        const fact = new create_js_1.CreateDAOFact(token, sender, this._contractAddress, this._serviceID, data.option, data.voteToken, data.threshold, data.fee, data.proposers, data.waitingTime, data.registrationPeriod, data.preSnapPeriod, data.votingPeriod, data.postSnapPeriod, data.executionDelay, data.turnout, data.quorum, currency);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    formTransferCalldata(sender, receiver, currency, amount) {
        return new calldata_js_1.TransferCalldata(sender, receiver, currency, amount).toHintedObject();
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
        return new calldata_js_1.GovernanceCallData(policyData).toHintedObject();
    }
    writeCryptoProposal(proposer, startTime, calldata) {
        return new proposal_js_1.CryptoProposal(proposer, startTime, calldata).toHintedObject();
    }
    writeBizProposal(proposer, startTime, url, hash, options) {
        return new proposal_js_1.BizProposal(proposer, startTime, url, hash, options).toHintedObject();
    }
    propose(sender, proposalId, startTime, proposal, currency) {
        const token = new time_js_1.TimeStamp().UTC();
        const fact = new propose_js_1.ProposeFact(token, sender, this._contractAddress, this._serviceID, proposalId, startTime, proposal, currency);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    register(sender, proposalId, delegator, currency) {
        const token = new time_js_1.TimeStamp().UTC();
        const fact = new register_js_1.RegisterFact(token, sender, this._contractAddress, this._serviceID, proposalId, delegator, currency);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    cancel(sender, proposalId, currency) {
        const token = new time_js_1.TimeStamp().UTC();
        const fact = new cancel_js_1.CancelProposalFact(token, sender, this._contractAddress, this._serviceID, proposalId, currency);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    snapBeforeVoting(sender, proposalId, currency) {
        const token = new time_js_1.TimeStamp().UTC();
        const fact = new snapBefore_js_1.PreSnapFact(token, sender, this._contractAddress, this._serviceID, proposalId, currency);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    castVote(sender, proposalId, vote, currency) {
        const token = new time_js_1.TimeStamp().UTC();
        const fact = new vote_js_1.VoteFact(token, sender, this._contractAddress, this._serviceID, proposalId, vote, currency);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    snapAfterVoting(sender, proposalId, currency) {
        const token = new time_js_1.TimeStamp().UTC();
        const fact = new snapAfter_js_1.PostSnapFact(token, sender, this._contractAddress, this._serviceID, proposalId, currency);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    execute(sender, proposalId, currency) {
        const token = new time_js_1.TimeStamp().UTC();
        const fact = new execute_js_1.ExecuteFact(token, sender, this._contractAddress, this._serviceID, proposalId, currency);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    getServiceInfo(serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            let daoId = this._serviceID;
            if (serviceId !== undefined) {
                daoId = serviceId;
            }
            const res = yield information_js_1.default.getServiceInfo(this._node, this._contractAddress, daoId);
            return res.data;
        });
    }
    getProposalInfo(serviceId, proposalId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield information_js_1.default.getProposalInfo(this._node, this._contractAddress, serviceId, proposalId);
            return res.data;
        });
    }
    getDelegatorInfo(serviceId, proposalId, delegator) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield information_js_1.default.getDelegatorInfo(this._node, this._contractAddress, serviceId, proposalId, delegator);
            return res.data;
        });
    }
    getVoterInfo(serviceId, proposalId, voter) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield information_js_1.default.getVoterInfo(this._node, this._contractAddress, serviceId, proposalId, voter);
            return res.data;
        });
    }
    getVotingResult(serviceId, proposalId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield information_js_1.default.getVotingResult(this._node, this._contractAddress, serviceId, proposalId);
            return res.data;
        });
    }
}
exports.Dao = Dao;
//# sourceMappingURL=index.js.map