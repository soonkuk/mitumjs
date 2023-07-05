"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuffrageInflationFact = exports.SuffrageInflationItem = void 0;
const error_js_1 = require("../utils/error.js");
const config_js_1 = require("../utils/config.js");
const math_js_1 = require("../utils/math.js");
const fact_js_1 = require("../types/fact.js");
const item_js_1 = require("../types/item.js");
const hint_js_1 = require("../types/hint.js");
const address_js_1 = require("../account/address.js");
class SuffrageInflationItem extends item_js_1.Item {
    constructor(receiver, amount) {
        super(hint_js_1.HINT.SUFFRAGE_INFLATION_ITEM);
        this.amount = amount;
        this.receiver = address_js_1.Address.from(receiver);
    }
    toBuffer() {
        return Buffer.concat([this.receiver.toBuffer(), this.amount.toBuffer()]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { receiver: this.receiver.toString(), amount: this.amount.toHintedObject() });
    }
    toString() {
        return `${this.receiver.toString()}-${this.amount.currency.toString()}`;
    }
}
exports.SuffrageInflationItem = SuffrageInflationItem;
class SuffrageInflationFact extends fact_js_1.NodeFact {
    constructor(token, items) {
        super(hint_js_1.HINT.SUFFRAGE_INFLATION_ITEM, token);
        error_js_1.Assert.check(config_js_1.MitumConfig.ITEMS_IN_FACT.satisfy(items.length), error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_ITEMS, "items length out of range"));
        error_js_1.Assert.check(new Set(items.map((it) => it.toString())).size === items.length, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_ITEMS, "duplicate receiver-currency found in items"));
        this.items = items;
        this._hash = this.hashing();
    }
    toBuffer() {
        return Buffer.concat([
            super.toBuffer(),
            Buffer.concat(this.items.sort(math_js_1.SortFunc).map((it) => it.toBuffer())),
        ]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { items: this.items.sort(math_js_1.SortFunc).map((it) => it.toHintedObject()) });
    }
    get operationHint() {
        return hint_js_1.HINT.SUFFRAGE_INFLATION_OPERATION;
    }
}
exports.SuffrageInflationFact = SuffrageInflationFact;
//# sourceMappingURL=inflate.js.map