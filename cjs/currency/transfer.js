"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransfersFact = exports.TransfersItem = void 0;
const error_1 = require("../utils/error");
const math_1 = require("../utils/math");
const fact_1 = require("../types/fact");
const hint_1 = require("../types/hint");
const address_1 = require("../account/address");
const currencyItem_1 = require("./currencyItem");
class TransfersItem extends currencyItem_1.CurrencyItem {
    constructor(receiver, amounts) {
        super(hint_1.HINT.TRANSFERS_ITEM, amounts);
        if (typeof receiver === "string") {
            if (receiver.endsWith(hint_1.SUFFIX.ZERO_ADDRESS)) {
                this.receiver = new address_1.ZeroAddress(receiver);
            }
            else {
                this.receiver = new address_1.Address(receiver);
            }
        }
        else {
            this.receiver = receiver;
        }
        if (this.receiver.type === "zero") {
            for (const am of amounts) {
                error_1.Assert.check(am.currency.equal(this.receiver.currency), error_1.MitumError.detail(error_1.ECODE.INVALID_AMOUNT, "invalid amount currency for given zero address"));
            }
        }
    }
    toBuffer() {
        return Buffer.concat([
            this.receiver.toBuffer(),
            Buffer.concat(this.amounts.sort(math_1.SortFunc).map((am) => am.toBuffer())),
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
class TransfersFact extends fact_1.OperationFact {
    constructor(token, sender, items) {
        super(hint_1.HINT.TRANSFERS_OPERATION_FACT, token, sender, items);
        error_1.Assert.check(new Set(items.map((it) => it.toString())).size === items.length, error_1.MitumError.detail(error_1.ECODE.INVALID_ITEMS, "duplicate receiver found in items"));
    }
    get operationHint() {
        return hint_1.HINT.TRANSFERS_OPERATION;
    }
}
exports.TransfersFact = TransfersFact;
//# sourceMappingURL=transfer.js.map