"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operation = void 0;
const validation_js_1 = require("../utils/validation.js");
const information_js_1 = __importDefault(require("./information.js"));
const sign_js_1 = require("./sign.js");
const send_js_1 = require("./send.js");
class Operation {
    constructor(provider) {
        this._node = "";
        this._setNode(provider);
    }
    _setNode(provider) {
        if ((0, validation_js_1.isIPAddress)(provider)) {
            this._node = provider;
        }
    }
    getAll() {
        return information_js_1.default.getAllOperationsInfo(this._node);
    }
    get(facthash) {
        return information_js_1.default.getOperationInfo(this._node, facthash);
    }
    // Optional: The option is node's address
    sign(privatekey, operation, option) {
        return (0, sign_js_1.signOperation)(privatekey, operation, option);
    }
    // NOTE: The send function is an asynchronous function. (return value: Promise Obj)
    send(signedOperation, headers) {
        return (0, send_js_1.sendOperation)(signedOperation, this._node, headers);
    }
}
exports.Operation = Operation;
//# sourceMappingURL=index.js.map