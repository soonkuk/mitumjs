import axios from "axios";
export async function sendOperation(signedOperation, provider, headers) {
    if (provider === "") {
        return Promise.reject(new Error("RPC-URL is not provided."));
    }
    try {
        if (headers) {
            return await axios.post(`${provider}/builder/send`, signedOperation, {
                headers,
            });
        }
        return await axios.post(`${provider}/builder/send`, signedOperation);
    }
    catch (error) {
        return Promise.reject(new Error(`Error getting node information: ${error.message}`));
    }
}
//# sourceMappingURL=send.js.map