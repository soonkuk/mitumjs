import { Address } from "../../account/address.js";
import { ContractID, CurrencyID } from "../../types/property.js";
import { Item } from "../../types/item.js";
export class NFTItem extends Item {
    constructor(hint, contract, collection, currency) {
        super(hint);
        this.contract = new Address(contract);
        this.collection = new ContractID(collection);
        this.currency = new CurrencyID(currency);
    }
    toBuffer() {
        return Buffer.concat([
            this.contract.toBuffer(),
            this.collection.toBuffer(),
        ]);
    }
    toHintedObject() {
        return {
            ...super.toHintedObject(),
            contract: this.contract.toString(),
            collection: this.collection.toString(),
            currency: this.currency.toString(),
        };
    }
}
//# sourceMappingURL=item.js.map