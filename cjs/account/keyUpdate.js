"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyUpdaterFact = void 0;
const property_js_1 = require("../types/property.js");
const fact_js_1 = require("../types/fact.js");
const hint_js_1 = require("../types/hint.js");
const address_js_1 = require("./address.js");
class KeyUpdaterFact extends fact_js_1.Fact {
    constructor(token, target, keys, currency) {
        super(hint_js_1.HINT.KEY_UPDATER_OPERATION_FACT, token);
        this.target = address_js_1.Address.from(target);
        this.keys = keys;
        this.currency = property_js_1.CurrencyID.from(currency);
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
        return hint_js_1.HINT.KEY_UPDATER_OPERATION;
    }
}
exports.KeyUpdaterFact = KeyUpdaterFact;
//# sourceMappingURL=keyUpdate.js.map