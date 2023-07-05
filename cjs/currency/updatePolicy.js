"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyPolicyUpdaterFact = void 0;
const property_js_1 = require("../types/property.js");
const fact_js_1 = require("../types/fact.js");
const hint_js_1 = require("../types/hint.js");
class CurrencyPolicyUpdaterFact extends fact_js_1.NodeFact {
    constructor(token, currency, policy) {
        super(hint_js_1.HINT.CURRENCY_POLICY_UPDATER_OPERATION_FACT, token);
        this.currency = property_js_1.CurrencyID.from(currency);
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
        return Object.assign(Object.assign({}, super.toHintedObject()), { currency: this.currency.toString(), policy: this.policy.toHintedObject() });
    }
    get operationHint() {
        return hint_js_1.HINT.CURRENCY_POLICY_UPDATER_OPERATION;
    }
}
exports.CurrencyPolicyUpdaterFact = CurrencyPolicyUpdaterFact;
//# sourceMappingURL=updatePolicy.js.map