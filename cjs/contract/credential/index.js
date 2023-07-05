"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Credential = void 0;
const validation_js_1 = require("../../utils/validation.js");
class Credential {
    constructor(networkID, provider) {
        this._networkID = "";
        this._node = "";
        this._address = "";
        this._collection = "";
        this._setNode(provider);
        this._setChain(networkID);
    }
    _setNode(provider) {
        if ((0, validation_js_1.isIPAddress)(provider)) {
            this._node = provider;
        }
    }
    _setChain(networkID) {
        this._networkID = networkID;
    }
}
exports.Credential = Credential;
//# sourceMappingURL=index.js.map