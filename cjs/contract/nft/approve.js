"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApproveFact = exports.ApproveItem = void 0;
const address_js_1 = require("../../account/address.js");
const item_js_1 = require("./item.js");
const error_js_1 = require("../../utils/error.js");
const math_js_1 = require("../../utils/math.js");
const fact_js_1 = require("../../types/fact.js");
const hintNft_js_1 = require("../../types/hintNft.js");
class ApproveItem extends item_js_1.NFTItem {
    constructor(contract, collection, approved, tokenId, currency) {
        super(hintNft_js_1.HINT_NFT.HINT_APPROVE_ITEM, contract, collection, currency);
        error_js_1.Assert.check(contract.toString() !== approved, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_ITEM, "The contract address is the same as the 'approved' address."));
        this.approved = new address_js_1.Address(approved);
        this.tokenId = new math_js_1.Big(tokenId);
    }
    toBuffer() {
        return Buffer.concat([
            super.toBuffer(),
            this.approved.toBuffer(),
            this.tokenId.toBuffer("fill"),
            this.currency.toBuffer(),
        ]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { approved: this.approved.toString(), nftidx: this.tokenId.v });
    }
    toString() {
        return this.tokenId.toString();
    }
}
exports.ApproveItem = ApproveItem;
class ApproveFact extends fact_js_1.OperationFact {
    constructor(token, sender, items) {
        super(hintNft_js_1.HINT_NFT.HINT_APPROVE_OPERATION_FACT, token, sender, items);
        error_js_1.Assert.check(new Set(items.map((it) => it.toString())).size === items.length, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_ITEMS, "A duplicate item exists"));
        items.forEach((item) => {
            error_js_1.Assert.check(item instanceof ApproveItem, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_ITEMS, "An invalidly formatted item exists."));
            error_js_1.Assert.check(item.contract.toString() !== sender, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_ITEMS, "The contract address is the same as the sender address."));
        });
    }
    get operationHint() {
        return hintNft_js_1.HINT_NFT.HINT_APPROVE_OPERATION;
    }
}
exports.ApproveFact = ApproveFact;
//# sourceMappingURL=approve.js.map