import axios from "axios";
export default {
    async getNftInfo(provider, contract, collection, tokenID) {
        if (provider === "" || contract === "") {
            return Promise.reject(new Error("RPC-URL is not provided or You need to set 'contract address'."));
        }
        try {
            const res = await axios.get(`${provider}/nft/${contract}/collection/${collection}/${tokenID}`);
            return res;
        }
        catch (error) {
            return Promise.reject(new Error(`Error getting node information: ${error.message}`));
        }
    },
};
//# sourceMappingURL=information.js.map