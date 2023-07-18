import axios from "axios";
export default {
    async getAllBlocksInfo(provider) {
        if (provider === "") {
            throw new Error("RPC-URL is not provided.");
        }
        try {
            const res = await axios.get(`${provider}/block/manifests`);
            return res;
        }
        catch (error) {
            throw new Error(error.response.data);
        }
    },
    async getBlockByHeight(provider, height) {
        if (provider === "") {
            throw new Error("RPC-URL is not provided.");
        }
        try {
            const res = await axios.get(`${provider}/block/${height}/manifest`);
            return res;
        }
        catch (error) {
            throw new Error(error.response.data);
        }
    },
    async getBlockByHash(provider, blockhash) {
        if (provider === "") {
            throw new Error("RPC-URL is not provided.");
        }
        try {
            const res = await axios.get(`${provider}/block/${blockhash}/manifest`);
            return res;
        }
        catch (error) {
            throw new Error(error.response.data);
        }
    },
    async getOperations(provider, block) {
        if (provider === "") {
            throw new Error("RPC-URL is not provided.");
        }
        try {
            const res = await axios.get(`${provider}/block/${block}/operations`);
            return res;
        }
        catch (error) {
            throw new Error(error.response.data);
        }
    },
};
//# sourceMappingURL=information.js.map