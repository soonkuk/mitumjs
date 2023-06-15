import { CurrencyID } from "../types/property";
import { Fact } from "../types/fact";
import { HINT } from "../types/hint";
import { Address } from "./address";
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
        return Object.assign(Object.assign({}, super.toHintedObject()), { target: this.target.toString(), keys: this.keys.toHintedObject(), currency: this.currency.toString() });
    }
    get operationHint() {
        return HINT.KEY_UPDATER_OPERATION;
    }
}
//# sourceMappingURL=keyUpdate.js.map