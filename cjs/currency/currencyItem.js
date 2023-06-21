"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyItem = void 0;
const item_js_1 = require("../types/item.js");
const error_js_1 = require("../utils/error.js");
const config_js_1 = require("../utils/config.js");
const math_js_1 = require("../utils/math.js");
class CurrencyItem extends item_js_1.Item {
    constructor(hint, amounts, addressType) {
        super(hint);
        error_js_1.Assert.check(config_js_1.MitumConfig.AMOUNTS_IN_ITEM.satisfy(amounts.length), error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_AMOUNTS, "amounts length out of range"));
        error_js_1.Assert.check(new Set(amounts.map((am) => am.currency.toString())).size ===
            amounts.length, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_AMOUNTS, "duplicate amounts found in amounts"));
        this.amounts = amounts;
        this.addressType = addressType !== null && addressType !== void 0 ? addressType : "";
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { amounts: this.amounts.sort(math_js_1.SortFunc).map((am) => am.toHintedObject()) });
    }
}
exports.CurrencyItem = CurrencyItem;
//# sourceMappingURL=currencyItem.js.map