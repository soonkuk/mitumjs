import { CurrencyID } from "../types/property";
import { NodeFact } from "../types/fact";
import { HINT } from "../types/hint";
export class CurrencyPolicyUpdaterFact extends NodeFact {
    constructor(token, currency, policy) {
        super(HINT.CURRENCY_POLICY_UPDATER_OPERATION_FACT, token);
        this.currency = CurrencyID.from(currency);
        this.policy = policy;
        this._hash = this.hashing();
    }
    toBuffer() {
        return Buffer.concat([
            super.toBuffer(),
            this.currency.toBuffer(),
            this.policy.toBuffer(),
        ]);
    }
    toHintedObject() {
        return {
            ...super.toHintedObject(),
            currency: this.currency.toString(),
            policy: this.policy.toHintedObject(),
        };
    }
    get operationHint() {
        return HINT.CURRENCY_POLICY_UPDATER_OPERATION;
    }
}
//# sourceMappingURL=updatePolicy.js.map