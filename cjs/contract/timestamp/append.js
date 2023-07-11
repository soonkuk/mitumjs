"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppendFact = void 0;
const property_js_1 = require("../../types/property.js");
const string_js_1 = require("../../types/string.js");
const fact_js_1 = require("../../types/fact.js");
const math_js_1 = require("../../utils/math.js");
const address_js_1 = require("../../account/address.js");
const AppendFactHint = "mitum-timestamp-append-operation-fact";
const AppendHint = "mitum-timestamp-append-operation";
class AppendFact extends fact_js_1.Fact {
    constructor(token, sender, contract, serviceID, projectID, requestTimestamp, data, currency) {
        super(AppendFactHint, token);
        this.sender = new address_js_1.Address(sender);
        this.contract = new address_js_1.Address(contract);
        this.serviceID = new property_js_1.ContractID(serviceID);
        this.projectID = new string_js_1.String(projectID);
        this.requestTimeStamp = new math_js_1.Big(requestTimestamp);
        this.data = new string_js_1.String(data);
        this.currency = new property_js_1.CurrencyID(currency);
        this._hash = this.hashing();
    }
    toBuffer() {
        return Buffer.concat([
            this.token.toBuffer(),
            this.sender.toBuffer(),
            this.contract.toBuffer(),
            this.serviceID.toBuffer(),
            this.projectID.toBuffer(),
            this.requestTimeStamp.toBuffer("fill"),
            this.data.toBuffer(),
            this.currency.toBuffer(),
        ]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { sender: this.sender.toString(), target: this.contract.toString(), service: this.serviceID.toString(), projectid: this.projectID.toString(), request_timestamp: this.requestTimeStamp.v, data: this.data.toString(), currency: this.currency.toString() });
    }
    get operationHint() {
        return AppendHint;
    }
}
exports.AppendFact = AppendFact;
//# sourceMappingURL=append.js.map