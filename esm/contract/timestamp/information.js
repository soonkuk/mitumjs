import axios from "axios";
export default {
    async getServiceInfo(provider, contract, serviceId) {
        if (provider === "" || contract === "" || serviceId === "") {
            throw new Error("RPC-URL is not provided or You need to set 'contract address and service id'.");
        }
        try {
            const res = await axios.get(`${provider}/timestamp/${contract}/service/${serviceId}`);
            return res;
        }
        catch (error) {
            throw new Error(error.response.data);
        }
    },
    async getTimestampInfo(provider, contract, serviceID, projectID, tID) {
        if (provider === "" ||
            contract === "" ||
            serviceID === "" ||
            projectID === "") {
            throw new Error("RPC-URL is not provided or You need to set 'contract address and service id'.");
        }
        try {
            const res = await axios.get(`${provider}/timestamp/${contract}/service/${serviceID}/project/${projectID}/id/${tID}`);
            return res;
        }
        catch (error) {
            throw new Error(error.response.data);
        }
    },
};
//# sourceMappingURL=information.js.map