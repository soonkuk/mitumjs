import { ContractID, CurrencyID } from "../../types/property.js";
import { Fact } from "../../types/fact.js";
import { String } from "../../types/string.js";
import { Address } from "../../account/address.js";
const SetDocumentFactHint = "mitum-sto-set-document-operation-fact";
const SetDocumentHint = "mitum-sto-set-document-operation";
export class SetDocumentFact extends Fact {
    constructor(token, sender, contract, serviceId, title, uri, documentHash, currency) {
        super(SetDocumentFactHint, token);
        this.sender = new Address(sender);
        this.contract = new Address(contract);
        this.serviceId = new ContractID(serviceId);
        this.title = new String(title);
        this.uri = new String(uri);
        this.documentHash = new String(documentHash);
        this.currency = new CurrencyID(currency);
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
        return {
            ...super.toHintedObject(),
            sender: this.sender.toString(),
            contract: this.contract.toString(),
            stoid: this.serviceId.toString(),
            title: this.title.toString(),
            uri: this.uri.toString(),
            documenthash: this.documentHash.toString(),
            currency: this.currency.toString(),
        };
    }
    get operationHint() {
        return SetDocumentHint;
    }
}
//# sourceMappingURL=document.js.map