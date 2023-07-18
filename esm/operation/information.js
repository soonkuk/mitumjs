import axios from "axios";
export default {
    async getAllOperationsInfo(provider) {
        if (provider === "") {
            throw new Error("RPC-URL is not provided.");
        }
        try {
            const res = await axios.get(`${provider}/block/operations`);
            return res;
        }
        catch (error) {
            throw new Error(error.response.data);
        }
    },
    async getOperationInfo(provider, facthash) {
        if (provider === "") {
            throw new Error("RPC-URL is not provided.");
        }
        try {
            const res = await axios.get(`${provider}/block/operation/${facthash}`);
            return res;
        }
        catch (error) {
            throw new Error(error.response.data);
        }
    },
};
//# sourceMappingURL=information.js.map