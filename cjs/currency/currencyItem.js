"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyItem = void 0;
const item_1 = require("../types/item");
const error_1 = require("../utils/error");
const config_1 = require("../utils/config");
const math_1 = require("../utils/math");
class CurrencyItem extends item_1.Item {
    constructor(hint, amounts, addressType) {
        super(hint);
        error_1.Assert.check(config_1.MitumConfig.AMOUNTS_IN_ITEM.satisfy(amounts.length), error_1.MitumError.detail(error_1.ECODE.INVALID_AMOUNTS, "amounts length out of range"));
        error_1.Assert.check(new Set(amounts.map((am) => am.currency.toString())).size ===
            amounts.length, error_1.MitumError.detail(error_1.ECODE.INVALID_AMOUNTS, "duplicate amounts found in amounts"));
        this.amounts = amounts;
        this.addressType = addressType !== null && addressType !== void 0 ? addressType : "";
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { amounts: this.amounts.sort(math_1.SortFunc).map((am) => am.toHintedObject()) });
    }
}
exports.CurrencyItem = CurrencyItem;
//# sourceMappingURL=currencyItem.js.map