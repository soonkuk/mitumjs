import axios from "axios";
export default {
    async getAllBlocksInfo(provider) {
        if (provider === "") {
            return Promise.reject(new Error("RPC-URL is not provided."));
        }
        try {
            const res = await axios.get(`${provider}/block/manifests`);
            return res;
        }
        catch (error) {
            return Promise.reject(new Error(`Error getting node information: ${error.message}`));
        }
    },
    async getBlockByHeight(provider, height) {
        if (provider === "") {
            return Promise.reject(new Error("RPC-URL is not provided."));
        }
        try {
            const res = await axios.get(`${provider}/block/${height}/manifest`);
            return res;
        }
        catch (error) {
            return Promise.reject(new Error(`Error getting node information: ${error.message}`));
        }
    },
    async getBlockByHash(provider, blockhash) {
        if (provider === "") {
            return Promise.reject(new Error("RPC-URL is not provided."));
        }
        try {
            const res = await axios.get(`${provider}/block/${blockhash}/manifest`);
            return res;
        }
        catch (error) {
            return Promise.reject(new Error(`Error getting node information: ${error.message}`));
        }
    },
    async getOperations(provider, block) {
        if (provider === "") {
            return Promise.reject(new Error("RPC-URL is not provided."));
        }
        try {
            const res = await axios.get(`${provider}/block/${block}/operations`);
            return res;
        }
        catch (error) {
            return Promise.reject(new Error(`Error getting node information: ${error.message}`));
        }
    },
};
//# sourceMappingURL=information.js.map