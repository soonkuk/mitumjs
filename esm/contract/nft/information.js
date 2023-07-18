import axios from "axios";
export default {
    async getNftInfo(provider, contract, collection, tokenID) {
        if (provider === "" || contract === undefined || collection === undefined) {
            throw new Error("RPC-URL is not provided or You need to set 'contract address and collection id'.");
        }
        try {
            const res = await axios.get(`${provider}/nft/${contract}/collection/${collection}/${tokenID}`);
            return res;
        }
        catch (error) {
            throw new Error(error.response.data);
        }
    },
    async getCollectionInfo(provider, contract, collection) {
        if (provider === "" || contract === undefined || collection === undefined) {
            throw new Error("RPC-URL is not provided or You need to set 'contract address and collection id'.");
        }
        try {
            const res = await axios.get(`${provider}/nft/${contract}/collection/${collection}`);
            return res;
        }
        catch (error) {
            throw new Error(error.response.data);
        }
    },
    async getAllNftInfo(provider, contract, collection) {
        if (provider === "" || contract === undefined || collection === undefined) {
            throw new Error("RPC-URL is not provided or You need to set 'contract address and collection id'.");
        }
        try {
            const res = await axios.get(`${provider}/nft/${contract}/collection/${collection}/nfts`);
            return res;
        }
        catch (error) {
            throw new Error(error.response.data);
        }
    },
    async getOperationInfo(provider, contract, collection, address) {
        if (provider === "" || contract === undefined || collection === undefined) {
            throw new Error("RPC-URL is not provided or You need to set 'contract address and collection id'.");
        }
        try {
            const res = await axios.get(`${provider}/nft/${contract}/collection/${collection}/account/${address}/operators`);
            return res;
        }
        catch (error) {
            throw new Error(error.response.data);
        }
    },
};
//# sourceMappingURL=information.js.map