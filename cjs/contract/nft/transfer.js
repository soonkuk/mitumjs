"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTTransferFact = exports.NFTTransferItem = void 0;
const address_js_1 = require("../../account/address.js");
const fact_js_1 = require("../../types/fact.js");
const error_js_1 = require("../../utils/error.js");
const math_js_1 = require("../../utils/math.js");
const item_js_1 = require("./item.js");
const hintNft_js_1 = require("../../types/hintNft.js");
class NFTTransferItem extends item_js_1.NFTItem {
    constructor(contract, collection, receiver, nft, currency) {
        super(hintNft_js_1.HINT_NFT.HINT_NFT_TRANSFER_ITEM, contract, collection, currency);
        error_js_1.Assert.check(contract.toString() !== receiver, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The contract address is the same as the receiver address."));
        this.receiver = new address_js_1.Address(receiver);
        this.nft = new math_js_1.Big(nft);
    }
    toBuffer() {
        return Buffer.concat([
            super.toBuffer(),
            this.receiver.toBuffer(),
            this.nft.toBuffer(),
            this.currency.toBuffer(),
        ]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { receiver: this.receiver.toString(), nft: this.nft.v });
    }
    toString() {
        return this.nft.toString();
    }
}
exports.NFTTransferItem = NFTTransferItem;
class NFTTransferFact extends fact_js_1.OperationFact {
    constructor(token, sender, items) {
        super(hintNft_js_1.HINT_NFT.HINT_NFT_TRANSFER_OPERATION_FACT, token, sender, items);
        items.forEach((item) => {
            error_js_1.Assert.check(item instanceof NFTTransferItem, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The type of items is incorrect."));
            error_js_1.Assert.check(item.contract.toString() !== sender, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The contract address is the same as the sender address."));
        });
        const iSet = new Set(items.map((item) => item.toString()));
        error_js_1.Assert.check(iSet.size === items.length, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "There are duplicate elements in items."));
    }
    get operationHint() {
        return hintNft_js_1.HINT_NFT.HINT_NFT_TRANSFER_OPERATION;
    }
}
exports.NFTTransferFact = NFTTransferFact;
//# sourceMappingURL=transfer.js.map