"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRegisterFact = void 0;
const property_1 = require("../../types/property");
const fact_1 = require("../../types/fact");
const address_1 = require("../../account/address");
const ServiceRegisterFactHint = "mitum-timestamp-service-register-operation-fact";
const ServiceRegisterHint = "mitum-timestamp-service-register-operation";
class ServiceRegisterFact extends fact_1.Fact {
    constructor(token, sender, contract, serviceID, currency) {
        super(ServiceRegisterFactHint, token);
        this.sender = new address_1.Address(sender);
        this.contract = new address_1.Address(contract);
        this.serviceID = new property_1.ContractID(serviceID);
        this.currency = new property_1.CurrencyID(currency);
        this._hash = this.hashing();
    }
    toBuffer() {
        return Buffer.concat([
            this.token.toBuffer(),
            this.sender.toBuffer(),
            this.contract.toBuffer(),
            this.serviceID.toBuffer(),
            this.currency.toBuffer(),
        ]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { sender: this.sender.toString(), target: this.contract.toString(), service: this.serviceID.toString(), currency: this.currency.toString() });
    }
    get operationHint() {
        return ServiceRegisterHint;
    }
}
exports.ServiceRegisterFact = ServiceRegisterFact;
//# sourceMappingURL=register.js.map