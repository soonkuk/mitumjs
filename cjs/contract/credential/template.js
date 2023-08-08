"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTemplateFact = void 0;
const property_js_1 = require("../../types/property.js");
const boolean_js_1 = require("../../types/boolean.js");
const string_js_1 = require("../../types/string.js");
const fact_js_1 = require("../../types/fact.js");
const date_js_1 = require("../../types/date.js");
const address_js_1 = require("../../account/address.js");
const AddTemplateFactHint = "mitum-credential-add-template-operation-fact";
const AddTemplateHint = "mitum-credential-add-template-operation";
class AddTemplateFact extends fact_js_1.Fact {
    constructor(token, sender, contract, credentialServiceID, templateID, templateName, serviceDate, expirationDate, templateShare, multiAudit, displayName, subjectKey, description, creator, currency) {
        super(AddTemplateFactHint, token);
        this.sender = new address_js_1.Address(sender);
        this.contract = new address_js_1.Address(contract);
        this.credentialServiceID = new property_js_1.ContractID(credentialServiceID);
        this.templateID = new string_js_1.String(templateID);
        this.templateName = new string_js_1.String(templateName);
        this.serviceDate = new date_js_1.Date(serviceDate);
        this.expirationDate = new date_js_1.Date(expirationDate);
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
            this.templateID.toBuffer(),
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
        return Object.assign(Object.assign({}, super.toHintedObject()), { sender: this.sender.toString(), contract: this.contract.toString(), credential_service_id: this.credentialServiceID.toString(), template_id: this.templateID.toString(), template_name: this.templateName.toString(), service_date: this.serviceDate.v, expiration_date: this.expirationDate.v, template_share: this.templateShare.v, multi_audit: this.multiAudit.v, display_name: this.displayName.toString(), subject_key: this.subjectKey.toString(), description: this.description.toString(), creator: this.creator.toString(), currency: this.currency.toString() });
    }
    get operationHint() {
        return AddTemplateHint;
    }
}
exports.AddTemplateFact = AddTemplateFact;
//# sourceMappingURL=template.js.map