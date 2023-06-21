import { isIPAddress } from "../utils/validation.js";
import operationInfo from "./information.js";
import { signOperation } from "./sign.js";
import { sendOperation } from "./send.js";
export class Operation {
    constructor(provider) {
        this._node = "";
        this._setNode(provider);
    }
    _setNode(provider) {
        if (isIPAddress(provider)) {
            this._node = provider;
        }
    }
    getAll() {
        return operationInfo.getAllOperationsInfo(this._node);
    }
    get(facthash) {
        return operationInfo.getOperationInfo(this._node, facthash);
    }
    // Optional: The option is node's address
    sign(privatekey, operation, option) {
        return signOperation(privatekey, operation, option);
    }
    // NOTE: The send function is an asynchronous function. (return value: Promise Obj)
    send(signedOperation, headers) {
        return sendOperation(signedOperation, this._node, headers);
    }
}
//# sourceMappingURL=index.js.map