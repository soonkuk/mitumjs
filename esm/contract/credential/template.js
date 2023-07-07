import { ContractID, CurrencyID } from "../../types/property.js";
import { Boolean } from "../../types/boolean.js";
import { String } from "../../types/string.js";
import { Fact } from "../../types/fact.js";
import { Date } from "../../types/date.js";
import { Big } from "../../utils/math.js";
import { Address } from "../../account/address.js";
const AddTemplateFactHint = "mitum-credential-add-template-operation-fact";
const AddTemplateHint = "mitum-credential-add-template-operation";
export class AddTemplateFact extends Fact {
    constructor(token, sender, contract, credentialServiceID, templateID, templateName, serviceDate, expirationDate, templateShare, multiAudit, displayName, subjectKey, description, creator, currency) {
        super(AddTemplateFactHint, token);
        this.sender = new Address(sender);
        this.contract = new Address(contract);
        this.credentialServiceID = new ContractID(credentialServiceID);
        this.templateID = new Big(templateID);
        this.templateName = new String(templateName);
        this.serviceDate = new Date(serviceDate);
        this.expirationDate = new Date(expirationDate);
        this.templateShare = new Boolean(templateShare);
        this.multiAudit = new Boolean(multiAudit);
        this.displayName = new String(displayName);
        this.subjectKey = new String(subjectKey);
        this.description = new String(description);
        this.creator = new Address(creator);
        this.currency = new CurrencyID(currency);
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
        return {
            ...super.toHintedObject(),
            sender: this.sender.toString(),
            contract: this.contract.toString(),
            credential_service_id: this.credentialServiceID.toString(),
            template_id: this.templateID.v,
            template_name: this.templateName.toString(),
            service_date: this.serviceDate.v,
            expiration_date: this.expirationDate.v,
            template_share: this.templateShare.v,
            multi_audit: this.multiAudit.v,
            display_name: this.displayName.toString(),
            subject_key: this.subjectKey.toString(),
            description: this.description.toString(),
            creator: this.creator.toString(),
            currency: this.currency.toString(),
        };
    }
    get operationHint() {
        return AddTemplateHint;
    }
}
//# sourceMappingURL=template.js.map