import axios from "axios";
export async function sendOperation(signedOperation, provider, headers) {
    if (provider === "") {
        throw new Error("RPC-URL is not provided.");
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
        throw new Error(error.response.data);
    }
}
//# sourceMappingURL=send.js.map