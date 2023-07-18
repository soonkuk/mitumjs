import axios from "axios";
export default {
    async getAddressInfo(provider, address) {
        if (provider === "") {
            throw new Error("RPC-URL is not provided.");
        }
        try {
            const res = await axios.get(`${provider}/account/${address}`);
            return res;
        }
        catch (error) {
            throw new Error(error.response.data);
        }
    },
    async getOperationsByAddress(provider, address) {
        if (provider === "") {
            throw new Error("RPC-URL is not provided.");
        }
        try {
            const res = await axios.get(`${provider}/account/${address}/operations`);
            return res;
        }
        catch (error) {
            throw new Error(error.response.data);
        }
    },
    async getAccountInfoByPublickey(provider, publickey) {
        if (provider === "") {
            throw new Error("RPC-URL is not provided.");
        }
        try {
            const res = await axios.get(`${provider}/accounts?publickey=${publickey}`);
            return res;
        }
        catch (error) {
            throw new Error(error.response.data);
        }
    },
};
//# sourceMappingURL=information.js.map