"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyRegisterFact = void 0;
const fact_1 = require("../types/fact");
const hint_1 = require("../types/hint");
class CurrencyRegisterFact extends fact_1.NodeFact {
    constructor(token, design) {
        super(hint_1.HINT.CURRENCY_REGISTER_OPERATION_FACT, token);
        this.design = design;
        this._hash = this.hashing();
    }
    toBuffer() {
        return Buffer.concat([this.token.toBuffer(), this.design.toBuffer()]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { currency: this.design.toHintedObject() });
    }
    get operationHint() {
        return hint_1.HINT.CURRENCY_REGISTER_OPERATION;
    }
}
exports.CurrencyRegisterFact = CurrencyRegisterFact;
//# sourceMappingURL=register.js.map