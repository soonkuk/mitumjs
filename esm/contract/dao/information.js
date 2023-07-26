import axios from "axios";
export default {
    async getServiceInfo(provider, contract, serviceId) {
        if (provider === "" || contract === "" || serviceId === "") {
            throw new Error("RPC-URL is not provided or You need to set 'contract address and dao id'.");
        }
        try {
            const res = await axios.get(`${provider}/dao/${contract}/service/${serviceId}`);
            return res;
        }
        catch (error) {
            throw new Error(error.response.data);
        }
    },
    async getProposalInfo(provider, contract, serviceId, proposalId) {
        if (provider === "" || contract === "" || serviceId === "") {
            throw new Error("RPC-URL is not provided or You need to set 'contract address and dao id'.");
        }
        try {
            const res = await axios.get(`${provider}/dao/${contract}/service/${serviceId}/proposal/${proposalId}`);
            return res;
        }
        catch (error) {
            throw new Error(error.response.data);
        }
    },
    async getDelegatorInfo(provider, contract, serviceId, proposalId, delegator) {
        if (provider === "" || contract === "" || serviceId === "") {
            throw new Error("RPC-URL is not provided or You need to set 'contract address and dao id'.");
        }
        try {
            const res = await axios.get(`${provider}/dao/${contract}/service/${serviceId}/proposal/${proposalId}/delegator/${delegator}}`);
            return res;
        }
        catch (error) {
            throw new Error(error.response.data);
        }
    },
    async getVoterInfo(provider, contract, serviceId, proposalId, voter) {
        if (provider === "" || contract === "" || serviceId === "") {
            throw new Error("RPC-URL is not provided or You need to set 'contract address and dao id'.");
        }
        try {
            const res = await axios.get(`${provider}/dao/${contract}/service/${serviceId}/proposal/${proposalId}/voter/${voter}`);
            return res;
        }
        catch (error) {
            throw new Error(error.response.data);
        }
    },
    async getVotingResult(provider, contract, serviceId, proposalId) {
        if (provider === "" || contract === "" || serviceId === "") {
            throw new Error("RPC-URL is not provided or You need to set 'contract address and dao id'.");
        }
        try {
            const res = await axios.get(`${provider}/dao/${contract}/service/${serviceId}/proposal/${proposalId}/votingpower`);
            return res;
        }
        catch (error) {
            throw new Error(error.response.data);
        }
    },
};
//# sourceMappingURL=information.js.map