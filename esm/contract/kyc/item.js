import { Address } from "../../account/address.js";
import { ContractID, CurrencyID } from "../../types/property.js";
import { Item } from "../../types/item.js";
export class KYCItem extends Item {
    constructor(hint, contract, serviceId, currency) {
        super(hint);
        this.contract = new Address(contract);
        this.service = new ContractID(serviceId);
        this.currency = new CurrencyID(currency);
    }
    toBuffer() {
        return Buffer.concat([this.contract.toBuffer(), this.service.toBuffer()]);
    }
    toHintedObject() {
        return {
            ...super.toHintedObject(),
            contract: this.contract.toString(),
            kycid: this.service.toString(),
            currency: this.currency.toString(),
        };
    }
}
//# sourceMappingURL=item.js.map