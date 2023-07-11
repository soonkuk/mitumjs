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
exports.Timestamp = void 0;
const operation_js_1 = require("../../types/operation.js");
const validation_js_1 = require("../../utils/validation.js");
const validation_js_2 = require("../../utils/validation.js");
const time_js_1 = require("../../utils/time.js");
const information_js_1 = __importDefault(require("./information.js"));
const append_js_1 = require("./append.js");
const register_js_1 = require("./register.js");
class Timestamp {
    constructor(networkID, provider) {
        this._networkID = "";
        this._node = "";
        this._contractAddress = "";
        this._serviceID = "";
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
    setContractAddress(contractAddress) {
        if (this._contractAddress !== contractAddress &&
            (0, validation_js_2.isAddress)(contractAddress)) {
            this._contractAddress = contractAddress;
            console.log("Contract address is changed : ", this._contractAddress);
        }
        else {
            console.error("This is invalid address type");
        }
    }
    setServiceId(serviceId) {
        if (this._serviceID !== serviceId) {
            this._serviceID = serviceId;
            console.log("Credential ID is changed : ", this._serviceID);
        }
        else {
            console.error("This is invalid credential ID type");
        }
    }
    getContractAddress() {
        return this._contractAddress.toString();
    }
    getServiceId() {
        return this._serviceID.toString();
    }
    getServiceInfo(serviceID) {
        return __awaiter(this, void 0, void 0, function* () {
            let sid = this._serviceID;
            if (serviceID !== undefined) {
                sid = serviceID;
            }
            const res = yield information_js_1.default.getServiceInfo(this._node, this._contractAddress, sid);
            return res.data;
        });
    }
    getTimestampInfo(serviceID, projectID, tID) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield information_js_1.default.getTimestampInfo(this._node, this._contractAddress, serviceID, projectID, tID);
            return res.data;
        });
    }
    append(sender, projectID, requestTime, data, currencyID) {
        const token = new time_js_1.TimeStamp().UTC();
        const fact = new append_js_1.AppendFact(token, sender, this._contractAddress, this._serviceID, projectID, requestTime, data, currencyID);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    createTimestampService(sender, serviceId, currencyID) {
        const token = new time_js_1.TimeStamp().UTC();
        const fact = new register_js_1.ServiceRegisterFact(token, sender, this._contractAddress, serviceId, currencyID);
        this.setServiceId(serviceId);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
}
exports.Timestamp = Timestamp;
//# sourceMappingURL=index.js.map