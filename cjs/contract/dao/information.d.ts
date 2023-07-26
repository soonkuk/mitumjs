import { AxiosResponse } from "axios";
declare const _default: {
    getServiceInfo(provider: string, contract: string, serviceId: string): Promise<AxiosResponse>;
    getProposalInfo(provider: string, contract: string, serviceId: string, proposalId: string): Promise<AxiosResponse>;
    getDelegatorInfo(provider: string, contract: string, serviceId: string, proposalId: string, delegator: string): Promise<AxiosResponse>;
    getVoterInfo(provider: string, contract: string, serviceId: string, proposalId: string, voter: string): Promise<AxiosResponse>;
    getVotingResult(provider: string, contract: string, serviceId: string, proposalId: string): Promise<AxiosResponse>;
};
export default _default;
