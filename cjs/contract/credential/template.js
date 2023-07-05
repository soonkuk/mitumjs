"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTemplateFact = void 0;
const property_js_1 = require("../../types/property.js");
const boolean_js_1 = require("../../types/boolean.js");
const time_js_1 = require("../../utils/time.js");
const string_js_1 = require("../../types/string.js");
const fact_js_1 = require("../../types/fact.js");
const math_js_1 = require("../../utils/math.js");
const address_js_1 = require("../../account/address.js");
const AddTemplateFactHint = "mitum-credential-add-template-operation-fact";
const AddTemplateHint = "mitum-credential-add-template-operation";
class AddTemplateFact extends fact_js_1.Fact {
    constructor(token, sender, contract, credentialServiceID, templateID, templateName, serviceDate, expirationDate, templateShare, multiAudit, displayName, subjectKey, description, creator, currency) {
        super(AddTemplateFactHint, token);
        this.sender = new address_js_1.Address(sender);
        this.contract = new address_js_1.Address(contract);
        this.credentialServiceID = new property_js_1.ContractID(credentialServiceID);
        this.templateID = new math_js_1.Big(templateID);
        this.templateName = new string_js_1.String(templateName);
        this.serviceDate = new time_js_1.TimeStamp(serviceDate);
        this.expirationDate = new time_js_1.TimeStamp(expirationDate);
        this.templateShare = new boolean_js_1.Boolean(templateShare);
        this.multiAudit = new boolean_js_1.Boolean(multiAudit);
        this.displayName = new string_js_1.String(displayName);
        this.subjectKey = new string_js_1.String(subjectKey);
        this.description = new string_js_1.String(description);
        this.creator = new address_js_1.Address(creator);
        this.currency = new property_js_1.CurrencyID(currency);
        this._hash = this.hashing();
    }
    toBuffer() {
        return Buffer.concat([
            this.token.toBuffer(),
            this.sender.toBuffer(),
            this.contract.toBuffer(),
            this.credentialServiceID.toBuffer(),
            this.templateID.toBuffer("fill"),
            this.templateName.toBuffer(),
            this.serviceDate.toBuffer(),
            this.expirationDate.toBuffer(),
            this.templateShare.toBuffer(),
            this.multiAudit.toBuffer(),
            this.displayName.toBuffer(),
            this.subjectKey.toBuffer(),
            this.description.toBuffer(),
            this.creator.toBuffer(),
            this.currency.toBuffer(),
        ]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { sender: this.sender.toString(), contract: this.contract.toString(), credentialServiceID: this.credentialServiceID.toString(), templateID: this.templateID.v, templateName: this.templateName.toString(), serviceDate: this.serviceDate.toString(), expirationDate: this.expirationDate.toString(), templateShare: this.templateShare.v, multiAudit: this.multiAudit.v, displayName: this.displayName.toString(), subjectKey: this.subjectKey.toString(), description: this.description.toString(), creator: this.creator.toString(), currency: this.currency.toString() });
    }
    get operationHint() {
        return AddTemplateHint;
    }
}
exports.AddTemplateFact = AddTemplateFact;
//# sourceMappingURL=template.js.map