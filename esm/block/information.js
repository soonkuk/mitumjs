import axios from "axios";
export default {
    async getAllBlocksInfo(provider) {
        if (provider === "") {
            console.error("RPC-URL is not provided.");
            return null;
        }
        try {
            const res = await axios.get(`${provider}/block/manifests`);
            return res;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    },
    async getBlockByHeight(provider, height) {
        if (provider === "") {
            console.error("RPC-URL is not provided.");
            return null;
        }
        try {
            const res = await axios.get(`${provider}/block/${height}/manifest`);
            return res;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    },
    async getBlockByHash(provider, blockhash) {
        if (provider === "") {
            console.error("RPC-URL is not provided.");
            return null;
        }
        try {
            const res = await axios.get(`${provider}/block/${blockhash}/manifest`);
            return res;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    },
    async getOperations(provider, block) {
        if (provider === "") {
            console.error("RPC-URL is not provided.");
            return null;
        }
        try {
            const res = await axios.get(`${provider}/block/${block}/operations`);
            return res;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    },
};
//# sourceMappingURL=information.js.map