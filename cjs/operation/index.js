"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    getAllOperations() {
        return information_js_1.default.getAllOperationsInfo(this._node);
    }
    getOperation(facthash) {
        return information_js_1.default.getOperationInfo(this._node, facthash);
    }
    // Optional: The option is node's address
    sign(privatekey, operation, option) {
        return (0, sign_js_1.signOperation)(privatekey, operation, option);
    }
    send(signedOperation, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, send_js_1.sendOperation)(signedOperation, this._node, headers);
        });
    }
}
exports.Operation = Operation;
//# sourceMappingURL=index.js.map