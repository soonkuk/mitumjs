import axios from "axios";
export default {
    async getCredentialInfo(provider, contract, credential, id) {
        if (provider === "" || contract === "" || credential === "") {
            return Promise.reject(new Error("RPC-URL is not provided or You need to set 'contract address and credential id'."));
        }
        try {
            const res = await axios.get(`${provider}/credential/${contract}/collection/${credential}/${id}`);
            return res;
        }
        catch (error) {
            return Promise.reject(new Error(`Error getting node information: ${error.message}`));
        }
    },
};
//# sourceMappingURL=information.js.map