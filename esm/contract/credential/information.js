import axios from "axios";
export default {
    async getServiceInfo(provider, contract, serviceId) {
        if (provider === "" || contract === "" || serviceId === "") {
            throw new Error("RPC-URL is not provided or You need to set 'contract address and credential id'.");
        }
        try {
            const res = await axios.get(`${provider}/did/${contract}/issuer/${serviceId}`);
            return res;
        }
        catch (error) {
            throw new Error(error.response.data);
        }
    },
    async getCredentialInfo(provider, contract, serviceId, templateId, credentialId) {
        if (provider === "" || contract === "" || serviceId === "") {
            throw new Error("RPC-URL is not provided or You need to set 'contract address and credential id'.");
        }
        try {
            const res = await axios.get(`${provider}/did/${contract}/issuer/${serviceId}/template/${templateId}/credential/${credentialId}`);
            return res;
        }
        catch (error) {
            throw new Error(error.response.data);
        }
    },
    async getTemplate(provider, contract, serviceId, templateId) {
        if (provider === "" || contract === "" || serviceId === "") {
            throw new Error("RPC-URL is not provided or You need to set 'contract address and credential id'.");
        }
        try {
            const res = await axios.get(`${provider}/did/${contract}/issuer/${serviceId}/template/${templateId}`);
            return res;
        }
        catch (error) {
            throw new Error(error.response.data);
        }
    },
    async getCredentialByHolder(provider, contract, serviceId, holder) {
        if (provider === "" || contract === "" || serviceId === "") {
            throw new Error("RPC-URL is not provided or You need to set 'contract address and credential id'.");
        }
        try {
            const res = await axios.get(`${provider}/did/${contract}/issuer/${serviceId}/holder/${holder}`);
            return res;
        }
        catch (error) {
            throw new Error(error.response.data);
        }
    },
};
//# sourceMappingURL=information.js.map