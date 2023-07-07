import axios from "axios";
export default {
    async getServiceInfo(provider, contract, serviceId) {
        if (provider === "" || contract === "" || serviceId === "") {
            return Promise.reject(new Error("RPC-URL is not provided or You need to set 'contract address and credential id'."));
        }
        try {
            const res = await axios.get(`${provider}/did/${contract}/issuer/${serviceId}`);
            return res;
        }
        catch (error) {
            return Promise.reject(new Error(`Error getting node information: ${error.message}`));
        }
    },
    async getCredentialInfo(provider, contract, serviceId, templateId, credentialId) {
        if (provider === "" || contract === "" || serviceId === "") {
            return Promise.reject(new Error("RPC-URL is not provided or You need to set 'contract address and credential id'."));
        }
        try {
            const res = await axios.get(`${provider}/did/${contract}/issuer/${serviceId}/template/${templateId}/credential/${credentialId}`);
            return res;
        }
        catch (error) {
            return Promise.reject(new Error(`Error getting node information: ${error.message}`));
        }
    },
    async getTemplate(provider, contract, serviceId, templateId) {
        if (provider === "" || contract === "" || serviceId === "") {
            return Promise.reject(new Error("RPC-URL is not provided or You need to set 'contract address and credential id'."));
        }
        try {
            const res = await axios.get(`${provider}/did/${contract}/issuer/${serviceId}/template/${templateId}`);
            return res;
        }
        catch (error) {
            return Promise.reject(new Error(`Error getting node information: ${error.message}`));
        }
    },
    async getCredentialByHolder(provider, contract, serviceId, holder) {
        if (provider === "" || contract === "" || serviceId === "") {
            return Promise.reject(new Error("RPC-URL is not provided or You need to set 'contract address and credential id'."));
        }
        try {
            const res = await axios.get(`${provider}/did/${contract}/issuer/${serviceId}/holder/${holder}`);
            return res;
        }
        catch (error) {
            return Promise.reject(new Error(`Error getting node information: ${error.message}`));
        }
    },
};
//# sourceMappingURL=information.js.map