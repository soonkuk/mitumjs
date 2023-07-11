"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelegateFact = exports.DelegateItem = void 0;
const error_js_1 = require("../../utils/error.js");
const fact_js_1 = require("../../types/fact.js");
const hintNft_js_1 = require("../../types/hintNft.js");
const address_js_1 = require("../../account/address.js");
const item_js_1 = require("./item.js");
class DelegateItem extends item_js_1.NFTItem {
    constructor(contract, collection, operator, mode, currency) {
        super(hintNft_js_1.HINT_NFT.HINT_DELEGATE_ITEM, contract, collection, currency);
        error_js_1.Assert.check(contract.toString() !== operator, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_ITEM, "The contract address is the same as the operator address."));
        error_js_1.Assert.check(mode === "allow" || mode === "cancel", error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_ITEM, "The value of 'mode' must be one of 'allow' or 'cancel'."));
        this.operator = new address_js_1.Address(operator);
        this.mode = mode;
    }
    toBuffer() {
        return Buffer.concat([
            super.toBuffer(),
            this.operator.toBuffer(),
            Buffer.from(this.mode),
            this.currency.toBuffer(),
        ]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { operator: this.operator.toString(), mode: this.mode });
    }
    toString() {
        return (this.contract.toString() +
            this.collection.toString() +
            this.operator.toString());
    }
}
exports.DelegateItem = DelegateItem;
class DelegateFact extends fact_js_1.OperationFact {
    constructor(token, sender, items) {
        super(hintNft_js_1.HINT_NFT.HINT_DELEGATE_OPERATION_FACT, token, sender, items);
        error_js_1.Assert.check(new Set(items.map((it) => it.toString())).size === items.length, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_ITEMS, "A duplicate item exists"));
        items.forEach((item) => {
            error_js_1.Assert.check(item instanceof DelegateItem, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_ITEMS, "An invalidly formatted item exists."));
            error_js_1.Assert.check(item.contract.toString() !== sender, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_ITEMS, "The contract address is the same as the sender address."));
        });
    }
    get operationHint() {
        return hintNft_js_1.HINT_NFT.HINT_DELEGATE_OPERATION;
    }
}
exports.DelegateFact = DelegateFact;
//# sourceMappingURL=delegate.js.map