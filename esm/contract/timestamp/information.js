import axios from "axios";
export default {
    async getServiceInfo(provider, contract, serviceId) {
        if (provider === "" || contract === "" || serviceId === "") {
            console.error("RPC-URL is not provided or You need to set 'contract address and service id'.");
            return null;
        }
        try {
            const res = await axios.get(`${provider}/timestamp/${contract}/service/${serviceId}`);
            return res;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    },
    async getTimestampInfo(provider, contract, serviceID, projectID, tID) {
        if (provider === "" ||
            contract === "" ||
            serviceID === "" ||
            projectID === "") {
            console.error("RPC-URL is not provided or You need to set 'contract address and service id'.");
            return null;
        }
        try {
            const res = await axios.get(`${provider}/timestamp/${contract}/service/${serviceID}/project/${projectID}/id/${tID}`);
            return res;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    },
};
//# sourceMappingURL=information.js.map