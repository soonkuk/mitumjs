"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOperatorFact = void 0;
const math_js_1 = require("../utils/math.js");
const fact_js_1 = require("../types/fact.js");
const hint_js_1 = require("../types/hint.js");
const property_js_1 = require("../types/property.js");
const address_js_1 = require("../account/address.js");
class UpdateOperatorFact extends fact_js_1.Fact {
    constructor(token, sender, contract, operators, currency) {
        super(hint_js_1.HINT.UPDATE_OPERATOR_OPERATION_FACT, token);
        this.sender = address_js_1.Address.from(sender);
        this.contract = address_js_1.Address.from(contract);
        this.operators = operators.map((w) => new address_js_1.Address(w));
        this.currency = property_js_1.CurrencyID.from(currency);
        this._hash = this.hashing();
    }
    toBuffer() {
        return Buffer.concat([
            this.token.toBuffer(),
            this.sender.toBuffer(),
            this.contract.toBuffer(),
            Buffer.concat(this.operators.sort(math_js_1.SortFunc).map((w) => w.toBuffer())),
            this.currency.toBuffer(),
        ]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { sender: this.sender.toString(), contract: this.contract.toString(), whitelist: this.operators.sort(math_js_1.SortFunc).map((w) => w.toString()), currency: this.currency.toString() });
    }
    get operationHint() {
        return hint_js_1.HINT.UPDATE_OPERATOR_OPERATION;
    }
}
exports.UpdateOperatorFact = UpdateOperatorFact;
//# sourceMappingURL=updateOperator.js.map