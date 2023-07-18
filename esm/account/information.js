import axios from "axios";
export default {
    async getAddressInfo(provider, address) {
        if (provider === "") {
            console.error("RPC-URL is not provided.");
            return null;
        }
        try {
            const res = await axios.get(`${provider}/account/${address}`);
            return res;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    },
    async getOperationsByAddress(provider, address) {
        if (provider === "") {
            console.error("RPC-URL is not provided.");
            return null;
        }
        try {
            const res = await axios.get(`${provider}/account/${address}/operations`);
            return res;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    },
    async getAccountInfoByPublickey(provider, publickey) {
        if (provider === "") {
            console.error("RPC-URL is not provided.");
            return null;
        }
        try {
            const res = await axios.get(`${provider}/accounts?publickey=${publickey}`);
            return res;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    },
};
//# sourceMappingURL=information.js.map