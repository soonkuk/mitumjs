"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetDocumentFact = void 0;
const property_js_1 = require("../../types/property.js");
const fact_js_1 = require("../../types/fact.js");
const string_js_1 = require("../../types/string.js");
const address_js_1 = require("../../account/address.js");
const SetDocumentFactHint = "mitum-sto-set-document-operation-fact";
const SetDocumentHint = "mitum-sto-set-document-operation";
class SetDocumentFact extends fact_js_1.Fact {
    constructor(token, sender, contract, serviceId, title, uri, documentHash, currency) {
        super(SetDocumentFactHint, token);
        this.sender = new address_js_1.Address(sender);
        this.contract = new address_js_1.Address(contract);
        this.serviceId = new property_js_1.ContractID(serviceId);
        this.title = new string_js_1.String(title);
        this.uri = new string_js_1.String(uri);
        this.documentHash = new string_js_1.String(documentHash);
        this.currency = new property_js_1.CurrencyID(currency);
        this._hash = this.hashing();
    }
    toBuffer() {
        return Buffer.concat([
            this.token.toBuffer(),
            this.sender.toBuffer(),
            this.contract.toBuffer(),
            this.serviceId.toBuffer(),
            this.title.toBuffer(),
            this.uri.toBuffer(),
            this.documentHash.toBuffer(),
            this.currency.toBuffer(),
        ]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { sender: this.sender.toString(), contract: this.contract.toString(), stoid: this.serviceId.toString(), title: this.title.toString(), uri: this.uri.toString(), documenthash: this.documentHash.toString(), currency: this.currency.toString() });
    }
    get operationHint() {
        return SetDocumentHint;
    }
}
exports.SetDocumentFact = SetDocumentFact;
//# sourceMappingURL=document.js.map