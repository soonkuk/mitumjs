"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyUpdaterFact = void 0;
const property_1 = require("../types/property");
const fact_1 = require("../types/fact");
const hint_1 = require("../types/hint");
const address_1 = require("./address");
class KeyUpdaterFact extends fact_1.Fact {
    constructor(token, target, keys, currency) {
        super(hint_1.HINT.KEY_UPDATER_OPERATION_FACT, token);
        this.target = address_1.Address.from(target);
        this.keys = keys;
        this.currency = property_1.CurrencyID.from(currency);
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
        return hint_1.HINT.KEY_UPDATER_OPERATION;
    }
}
exports.KeyUpdaterFact = KeyUpdaterFact;
//# sourceMappingURL=keyUpdate.js.map