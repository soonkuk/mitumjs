"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransfersFact = exports.TransfersItem = void 0;
const error_js_1 = require("../utils/error.js");
const math_js_1 = require("../utils/math.js");
const fact_js_1 = require("../types/fact.js");
const hint_js_1 = require("../types/hint.js");
const address_js_1 = require("../account/address.js");
const currencyItem_js_1 = require("./currencyItem.js");
class TransfersItem extends currencyItem_js_1.CurrencyItem {
    constructor(receiver, amounts) {
        super(hint_js_1.HINT.TRANSFERS_ITEM, amounts);
        if (typeof receiver === "string") {
            if (receiver.endsWith(hint_js_1.SUFFIX.ZERO_ADDRESS)) {
                this.receiver = new address_js_1.ZeroAddress(receiver);
            }
            else {
                this.receiver = new address_js_1.Address(receiver);
            }
        }
        else {
            this.receiver = receiver;
        }
        if (this.receiver.type === "zero") {
            for (const am of amounts) {
                error_js_1.Assert.check(am.currency.equal(this.receiver.currency), error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_AMOUNT, "invalid amount currency for given zero address"));
            }
        }
    }
    toBuffer() {
        return Buffer.concat([
            this.receiver.toBuffer(),
            Buffer.concat(this.amounts.sort(math_js_1.SortFunc).map((am) => am.toBuffer())),
        ]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { receiver: this.receiver.toString() });
    }
    toString() {
        return this.receiver.toString();
    }
}
exports.TransfersItem = TransfersItem;
class TransfersFact extends fact_js_1.OperationFact {
    constructor(token, sender, items) {
        super(hint_js_1.HINT.TRANSFERS_OPERATION_FACT, token, sender, items);
        error_js_1.Assert.check(new Set(items.map((it) => it.toString())).size === items.length, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_ITEMS, "duplicate receiver found in items"));
    }
    get operationHint() {
        return hint_js_1.HINT.TRANSFERS_OPERATION;
    }
}
exports.TransfersFact = TransfersFact;
//# sourceMappingURL=transfer.js.map