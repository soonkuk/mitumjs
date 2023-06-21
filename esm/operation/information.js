import axios from "axios";
export default {
    async getAllOperationsInfo(provider) {
        if (provider === "") {
            return Promise.reject(new Error("RPC-URL is not provided."));
        }
        try {
            const res = await axios.get(`${provider}/block/operations`);
            return res;
        }
        catch (error) {
            return Promise.reject(new Error(`Error getting node information: ${error.message}`));
        }
    },
    async getOperationInfo(provider, facthash) {
        if (provider === "") {
            return Promise.reject(new Error("RPC-URL is not provided."));
        }
        try {
            const res = await axios.get(`${provider}/block/operation/${facthash}`);
            return res;
        }
        catch (error) {
            return Promise.reject(new Error(`Error getting node information: ${error.message}`));
        }
    },
};
//# sourceMappingURL=information.js.map