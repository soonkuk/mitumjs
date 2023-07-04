"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MintFact = exports.MintItem = exports.NFTHash = void 0;
const error_js_1 = require("../../utils/error.js");
const fact_js_1 = require("../../types/fact.js");
const config_js_1 = require("../../utils/config.js");
const hintNft_js_1 = require("../../types/hintNft.js");
const sign_js_1 = require("./sign.js");
const policy_js_1 = require("./policy.js");
const item_js_1 = require("./item.js");
class NFTHash {
    constructor(s) {
        error_js_1.Assert.check(typeof s === "string", error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The type of Hash is not 'string'."));
        error_js_1.Assert.check(config_js_1.MitumConfig.MAX_NFT_HASH_LENGTH.satisfy(s.length), error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The NFT-hash's length is out of range."));
        this.s = s;
    }
    toBuffer() {
        return Buffer.from(this.s);
    }
    toString() {
        return this.s;
    }
}
exports.NFTHash = NFTHash;
class MintItem extends item_js_1.NFTItem {
    constructor(contract, collection, hash, uri, creators, currency) {
        super(hintNft_js_1.HINT_NFT.HINT_MINT_ITEM, contract, collection, currency);
        this.hash = new NFTHash(hash);
        this.uri = new policy_js_1.NFTURI(uri);
        error_js_1.Assert.check(creators instanceof sign_js_1.NFTSigners, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The type of creators is incorrect."));
        this.creators = creators;
    }
    toBuffer() {
        return Buffer.concat([
            super.toBuffer(),
            this.hash.toBuffer(),
            this.uri.toBuffer(),
            this.creators.toBuffer(),
            this.currency.toBuffer(),
        ]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { contract: this.contract.toString(), collection: this.collection.toString(), hash: this.hash.toString(), uri: this.uri.toString(), creators: this.creators.toHintedObject(), currency: this.currency.toString() });
    }
    toString() {
        return this.collection.toString();
    }
}
exports.MintItem = MintItem;
class MintFact extends fact_js_1.OperationFact {
    constructor(token, sender, items) {
        super(hintNft_js_1.HINT_NFT.HINT_MINT_OPERATION_FACT, token, sender, items);
        items.forEach((item) => error_js_1.Assert.check(item instanceof MintItem, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The type of item is incorrect.")));
    }
    get operationHint() {
        return hintNft_js_1.HINT_NFT.HINT_MINT_OPERATION;
    }
}
exports.MintFact = MintFact;
//# sourceMappingURL=mint.js.map