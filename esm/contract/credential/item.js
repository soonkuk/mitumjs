import { Address } from "../../account/address.js";
import { ContractID, CurrencyID } from "../../types/property.js";
import { Item } from "../../types/item.js";
import { Big } from "../../utils/math.js";
import { String } from "../../types/string.js";
export class CredentialsItem extends Item {
    constructor(hint, contract, credentialServiceID, holder, templateID, id, currency) {
        super(hint);
        this.contract = new Address(contract);
        this.credentialServiceID = new ContractID(credentialServiceID);
        this.holder = new Address(holder);
        this.templateID = new Big(templateID);
        this.id = new String(id);
        this.currency = new CurrencyID(currency);
    }
    toBuffer() {
        return Buffer.concat([
            this.contract.toBuffer(),
            this.credentialServiceID.toBuffer(),
            this.holder.toBuffer(),
            this.templateID.toBuffer("fill"),
            this.id.toBuffer(),
        ]);
    }
    toHintedObject() {
        return {
            ...super.toHintedObject(),
            contract: this.contract.toString(),
            credentialServiceID: this.credentialServiceID.toString(),
            holder: this.holder.toString(),
            templateID: this.templateID.v,
            id: this.id.toString(),
            currency: this.currency.toString(),
        };
    }
}
//# sourceMappingURL=item.js.map