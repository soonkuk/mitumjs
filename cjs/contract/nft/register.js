"use strict";
// import bs58 from "bs58";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionRegisterFact = void 0;
const error_js_1 = require("../../utils/error.js");
const property_js_1 = require("../../types/property.js");
const config_js_1 = require("../../utils/config.js");
const hintNft_js_1 = require("../../types/hintNft.js");
const math_js_1 = require("../../utils/math.js");
const fact_js_1 = require("../../types/fact.js");
const policy_js_1 = require("./policy.js");
const address_js_1 = require("../../account/address.js");
class CollectionRegisterFact extends fact_js_1.Fact {
    constructor(token, sender, contract, collection, name, royalty, uri, whites, currency) {
        super(hintNft_js_1.HINT_NFT.HINT_COLLECTION_REGISTER_OPERATION_FACT, token);
        this.sender = new address_js_1.Address(sender);
        this.contract = new address_js_1.Address(contract);
        this.collection = new property_js_1.ContractID(collection);
        this.name = new policy_js_1.CollectionName(name);
        this.royalty = new policy_js_1.PaymentParam(royalty);
        this.uri = new policy_js_1.NFTURI(uri);
        this.currency = new property_js_1.CurrencyID(currency);
        error_js_1.Assert.check(Array.isArray(whites), error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "'white-lists' of the params is not Array."));
        error_js_1.Assert.check(config_js_1.MitumConfig.MAX_WHITELIST_IN_COLLECTION.satisfy(whites.length), error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "'white-lists' length is out of range."));
        this.whites = whites.map((w) => new address_js_1.Address(w));
        const wSet = new Set(whites);
        error_js_1.Assert.check(wSet.size === whites.length, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "A duplicate item exists."));
        this._hash = this.hashing();
    }
    toBuffer() {
        return Buffer.concat([
            this.token.toBuffer(),
            this.sender.toBuffer(),
            this.contract.toBuffer(),
            this.collection.toBuffer(),
            this.name.toBuffer(),
            this.royalty.toBuffer("fill"),
            this.uri.toBuffer(),
            this.currency.toBuffer(),
            Buffer.concat(this.whites.sort(math_js_1.SortFunc).map((w) => w.toBuffer())),
        ]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { sender: this.sender.toString(), contract: this.contract.toString(), collection: this.collection.toString(), name: this.name.toString(), royalty: this.royalty.v, uri: this.uri.toString(), whitelist: this.whites.sort(math_js_1.SortFunc).map((w) => w.toString()), currency: this.currency.toString() });
    }
    get operationHint() {
        return hintNft_js_1.HINT_NFT.HINT_COLLECTION_REGISTER_OPERATION;
    }
}
exports.CollectionRegisterFact = CollectionRegisterFact;
//# sourceMappingURL=register.js.map