import axios from "axios";
import { isIPAddress } from "../utils/validation.js";
export class Node {
    constructor(provider) {
        this._node = "";
        this.setNode(provider);
    }
    setNode(provider) {
        if (isIPAddress(provider)) {
            this._node = provider;
            console.log("NOTE: mitum.js is running with RPC-URL: ", provider);
        }
        else {
            console.warn("NOTE: Failed to configure the RPC-URL. Please verify and register the RPC-URL");
        }
    }
    getNodeUri() {
        return this._node;
    }
    async getNodeInfo() {
        if (this._node === "") {
            return Promise.reject(new Error("RPC-URL is not provided."));
        }
        try {
            const res = await axios.get(`${this._node}/`);
            return res;
        }
        catch (error) {
            return Promise.reject(new Error(`Error getting node information: ${error.message}`));
        }
    }
}
//# sourceMappingURL=node.js.map