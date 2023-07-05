"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCredentialServiceFact = void 0;
const property_js_1 = require("../../types/property.js");
const fact_js_1 = require("../../types/fact.js");
const address_js_1 = require("../../account/address.js");
const CreateCredentialServiceFactHint = "mitum-credential-create-credential-service-operation-fact";
const CreateCredentialServiceHint = "mitum-credential-create-credential-service-operation";
class CreateCredentialServiceFact extends fact_js_1.Fact {
    constructor(token, sender, contract, credentialServiceID, currency) {
        super(CreateCredentialServiceFactHint, token);
        this.sender = new address_js_1.Address(sender);
        this.contract = new address_js_1.Address(contract);
        this.credentialServiceID = new property_js_1.ContractID(credentialServiceID);
        this.currency = new property_js_1.CurrencyID(currency);
        this._hash = this.hashing();
    }
    toBuffer() {
        return Buffer.concat([
            this.token.toBuffer(),
            this.sender.toBuffer(),
            this.contract.toBuffer(),
            this.credentialServiceID.toBuffer(),
            this.currency.toBuffer(),
        ]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { sender: this.sender.toString(), contract: this.contract.toString(), credentialServiceID: this.credentialServiceID.toString(), currency: this.currency.toString() });
    }
    get operationHint() {
        return CreateCredentialServiceHint;
    }
}
exports.CreateCredentialServiceFact = CreateCredentialServiceFact;
//# sourceMappingURL=create.js.map