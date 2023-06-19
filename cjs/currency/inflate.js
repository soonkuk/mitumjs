"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuffrageInflationFact = exports.SuffrageInflationItem = void 0;
const error_1 = require("../utils/error");
const config_1 = require("../utils/config");
const math_1 = require("../utils/math");
const fact_1 = require("../types/fact");
const item_1 = require("../types/item");
const hint_1 = require("../types/hint");
const address_1 = require("../account/address");
class SuffrageInflationItem extends item_1.Item {
    constructor(receiver, amount) {
        super(hint_1.HINT.SUFFRAGE_INFLATION_ITEM);
        this.amount = amount;
        this.receiver = address_1.Address.from(receiver);
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
class SuffrageInflationFact extends fact_1.NodeFact {
    constructor(token, items) {
        super(hint_1.HINT.SUFFRAGE_INFLATION_ITEM, token);
        error_1.Assert.check(config_1.MitumConfig.ITEMS_IN_FACT.satisfy(items.length), error_1.MitumError.detail(error_1.ECODE.INVALID_ITEMS, "items length out of range"));
        error_1.Assert.check(new Set(items.map((it) => it.toString())).size === items.length, error_1.MitumError.detail(error_1.ECODE.INVALID_ITEMS, "duplicate receiver-currency found in items"));
        this.items = items;
        this._hash = this.hashing();
    }
    toBuffer() {
        return Buffer.concat([
            super.toBuffer(),
            Buffer.concat(this.items.sort(math_1.SortFunc).map((it) => it.toBuffer())),
        ]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { items: this.items.sort(math_1.SortFunc).map((it) => it.toHintedObject()) });
    }
    get operationHint() {
        return hint_1.HINT.SUFFRAGE_INFLATION_OPERATION;
    }
}
exports.SuffrageInflationFact = SuffrageInflationFact;
//# sourceMappingURL=inflate.js.map