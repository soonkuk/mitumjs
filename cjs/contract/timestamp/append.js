"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppendFact = void 0;
const property_1 = require("../../types/property");
const string_1 = require("../../types/string");
const fact_1 = require("../../types/fact");
const math_1 = require("../../utils/math");
const address_1 = require("../../account/address");
const AppendFactHint = "mitum-timestamp-append-operation-fact";
const AppendHint = "mitum-timestamp-append-operation";
class AppendFact extends fact_1.Fact {
    constructor(token, sender, contract, serviceID, projectID, requestTimestamp, data, currency) {
        super(AppendFactHint, token);
        this.sender = new address_1.Address(sender);
        this.contract = new address_1.Address(contract);
        this.serviceID = new property_1.ContractID(serviceID);
        this.projectID = new string_1.String(projectID);
        this.requestTimeStamp = new math_1.Big(requestTimestamp);
        this.data = new string_1.String(data);
        this.currency = new property_1.CurrencyID(currency);
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