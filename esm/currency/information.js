import axios from "axios";
export default {
    async getAllCurrencyInfo(provider) {
        if (provider === "") {
            return Promise.reject(new Error("RPC-URL is not provided."));
        }
        try {
            const res = await axios.get(`${provider}/currency`);
            return res;
        }
        catch (error) {
            return Promise.reject(new Error(`Error getting node information: ${error.message}`));
        }
    },
    async getCurrencyInfo(provider, currencyID) {
        if (provider === "") {
            return Promise.reject(new Error("RPC-URL is not provided."));
        }
        try {
            const res = await axios.get(`${provider}/currency/${currencyID}`);
            return res;
        }
        catch (error) {
            return Promise.reject(new Error(`Error getting node information: ${error.message}`));
        }
    },
};
//# sourceMappingURL=information.js.map