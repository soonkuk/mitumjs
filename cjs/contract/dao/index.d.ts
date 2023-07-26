import { AxiosResponse } from "axios";
import { OperationType } from "../../types/operation.js";
import { HintedObject } from "../../types/interface.js";
import { Fact } from "../../types/fact.js";
import { Calldata } from "./calldata.js";
import { Proposal } from "./proposal.js";
import { daoData, policyData } from "./design.js";
export declare class Dao {
    private _networkID;
    private _node;
    private _contractAddress;
    private _serviceID;
    constructor(networkID: string, provider?: string);
    private _setNode;
    private _setChain;
    setContractAddress(contractAddress: string): void;
    setServiceId(serviceId: string): void;
    getContractAddress(): string;
    getServiceId(): string;
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
    createDAOService(sender: string, data: daoData, currency: string): OperationType<Fact>;
    formTransferCalldata(sender: string, receiver: string, currency: string, amount: number): HintedObject;
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
    formSetPolicyCalldata(policyData: policyData): HintedObject;
    writeCryptoProposal(proposer: string, startTime: number, calldata: Calldata): HintedObject;
    writeBizProposal(proposer: string, startTime: number, url: string, hash: string, options: number): HintedObject;
    propose(sender: string, proposalId: string, startTime: number, proposal: Proposal, currency: string): OperationType<Fact>;
    register(sender: string, proposalId: string, delegator: string, currency: string): OperationType<Fact>;
    cancel(sender: string, proposalId: string, currency: string): OperationType<Fact>;
    snapBeforeVoting(sender: string, proposalId: string, currency: string): OperationType<Fact>;
    castVote(sender: string, proposalId: string, vote: number, currency: string): OperationType<Fact>;
    snapAfterVoting(sender: string, proposalId: string, currency: string): OperationType<Fact>;
    execute(sender: string, proposalId: string, currency: string): OperationType<Fact>;
    getServiceInfo(serviceId?: string): Promise<AxiosResponse>;
    getProposalInfo(serviceId: string, proposalId: string): Promise<AxiosResponse>;
    getDelegatorInfo(serviceId: string, proposalId: string, delegator: string): Promise<AxiosResponse>;
    getVoterInfo(serviceId: string, proposalId: string, voter: string): Promise<AxiosResponse>;
    getVotingResult(serviceId: string, proposalId: string): Promise<AxiosResponse>;
}
