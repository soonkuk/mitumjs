import { CurrencyID } from "../types/property.js";
import { Fact } from "../types/fact.js";
import { HINT } from "../types/hint.js";
import { Address } from "./address.js";
export class KeyUpdaterFact extends Fact {
    constructor(token, target, keys, currency) {
        super(HINT.KEY_UPDATER_OPERATION_FACT, token);
        this.target = Address.from(target);
        this.keys = keys;
        this.currency = CurrencyID.from(currency);
        this._hash = this.hashing();
    }
    toBuffer() {
        return Buffer.concat([
            this.token.toBuffer(),
            this.target.toBuffer(),
            this.keys.toBuffer(),
            this.currency.toBuffer(),
        ]);
    }
    toHintedObject() {
        return {
            ...super.toHintedObject(),
            target: this.target.toString(),
            keys: this.keys.toHintedObject(),
            currency: this.currency.toString(),
        };
    }
    get operationHint() {
        return HINT.KEY_UPDATER_OPERATION;
    }
}
//# sourceMappingURL=keyUpdate.js.map