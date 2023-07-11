import axios from "axios";
export default {
    async getServiceInfo(provider, contract, serviceId) {
        if (provider === "" || contract === "" || serviceId === "") {
            return Promise.reject(new Error("RPC-URL is not provided or You need to set 'contract address and service id'."));
        }
        try {
            const res = await axios.get(`${provider}/timestamp/${contract}/service/${serviceId}`);
            return res;
        }
        catch (error) {
            return Promise.reject(new Error(`Error getting node information: ${error.message}`));
        }
    },
    async getTimestampInfo(provider, contract, serviceID, projectID, tID) {
        if (provider === "" ||
            contract === "" ||
            serviceID === "" ||
            projectID === "") {
            return Promise.reject(new Error("RPC-URL is not provided or You need to set correct params"));
        }
        try {
            const res = await axios.get(`${provider}/timestamp/${contract}/service/${serviceID}/project/${projectID}/id/${tID}`);
            return res;
        }
        catch (error) {
            return Promise.reject(new Error(`Error getting node information: ${error.message}`));
        }
    },
};
//# sourceMappingURL=information.js.map