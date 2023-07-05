import { isIPAddress } from "../../utils/validation.js";
export class Credential {
    constructor(networkID, provider) {
        this._networkID = "";
        this._node = "";
        this._address = "";
        this._collection = "";
        this._setNode(provider);
        this._setChain(networkID);
    }
    _setNode(provider) {
        if (isIPAddress(provider)) {
            this._node = provider;
        }
    }
    _setChain(networkID) {
        this._networkID = networkID;
    }
}
//# sourceMappingURL=index.js.map