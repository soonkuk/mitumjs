import axios from "axios";
export default {
    async getAddressInfo(provider, address) {
        if (provider === "") {
            return Promise.reject(new Error("RPC-URL is not provided."));
        }
        try {
            const res = await axios.get(`${provider}/account/${address}`);
            return res;
        }
        catch (error) {
            return Promise.reject(new Error(`Error getting node information: ${error.message}`));
        }
    },
    async getOperationsByAddress(provider, address) {
        if (provider === "") {
            return Promise.reject(new Error("RPC-URL is not provided."));
        }
        try {
            const res = await axios.get(`${provider}/account/${address}/operations`);
            return res;
        }
        catch (error) {
            return Promise.reject(new Error(`Error getting node information: ${error.message}`));
        }
    },
    async getAccountInfoByPublickey(provider, publickey) {
        if (provider === "") {
            return Promise.reject(new Error("RPC-URL is not provided."));
        }
        try {
            const res = await axios.get(`${provider}/accounts?publickey=${publickey}`);
            return res;
        }
        catch (error) {
            return Promise.reject(new Error(`Error getting node information: ${error.message}`));
        }
    },
};
//# sourceMappingURL=information.js.map