import { Address } from "../../account/address.js";
import { CurrencyID } from "../../types/property.js";
import { Item } from "../../types/item.js";
import { String } from "../../types/string.js";
import { ServiceID } from "../../types/serviceId.js";
export class CredentialsItem extends Item {
    constructor(hint, contract, credentialServiceID, holder, templateID, id, currency) {
        super(hint);
        this.contract = new Address(contract);
        this.credentialServiceID = new ServiceID(credentialServiceID);
        this.holder = new Address(holder);
        this.templateID = new String(templateID);
        this.id = new String(id);
        this.currency = new CurrencyID(currency);
    }
    toBuffer() {
        return Buffer.concat([
            this.contract.toBuffer(),
            this.credentialServiceID.toBuffer(),
            this.holder.toBuffer(),
            this.templateID.toBuffer(),
            this.id.toBuffer(),
        ]);
    }
    toHintedObject() {
        return {
            ...super.toHintedObject(),
            contract: this.contract.toString(),
            credential_service_id: this.credentialServiceID.toString(),
            holder: this.holder.toString(),
            template_id: this.templateID.toString(),
            id: this.id.toString(),
            currency: this.currency.toString(),
        };
    }
    toString() {
        return this.id.toString();
    }
}
//# sourceMappingURL=item.js.map