"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionPolicyUpdaterFact = void 0;
const address_js_1 = require("../../account/address.js");
const property_js_1 = require("../../types/property.js");
const fact_js_1 = require("../../types/fact.js");
const error_js_1 = require("../../utils/error.js");
const hintNft_js_1 = require("../../types/hintNft.js");
const config_js_1 = require("../../utils/config.js");
const math_1 = require("../../utils/math");
const policy_js_1 = require("./policy.js");
class CollectionPolicyUpdaterFact extends fact_js_1.Fact {
    constructor(token, sender, contract, collection, name, royalty, uri, whitelist, currency) {
        super(hintNft_js_1.HINT_NFT.HINT_COLLECTION_POLICY_UPDATER_OPERATION_FACT, token);
        error_js_1.Assert.check(contract !== sender, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The contract address is the same as the sender address."));
        this.sender = new address_js_1.Address(sender);
        this.contract = new address_js_1.Address(contract);
        this.collection = new property_js_1.ContractID(collection);
        this.name = new policy_js_1.CollectionName(name);
        this.royalty = new policy_js_1.PaymentParam(royalty);
        this.uri = new policy_js_1.NFTURI(uri);
        this.currency = new property_js_1.CurrencyID(currency);
        error_js_1.Assert.check(Array.isArray(whitelist), error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "'whites' is not Array."));
        error_js_1.Assert.check(config_js_1.MitumConfig.MAX_WHITELIST_IN_COLLECTION.satisfy(whitelist.length), error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "White-lists length is out of range."));
        this.whitelist = whitelist.map((w) => new address_js_1.Address(w));
        const wSet = new Set(whitelist);
        error_js_1.Assert.check(wSet.size === whitelist.length, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "A duplicate item exists."));
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
            Buffer.concat(this.whitelist.sort(math_1.SortFunc).map((w) => w.toBuffer())),
        ]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { sender: this.sender.toString(), contract: this.contract.toString(), collection: this.collection.toString(), name: this.name.toString(), royalty: this.royalty.v, uri: this.uri.toString(), whitelist: this.whitelist.sort(math_1.SortFunc).map((w) => w.toString()), currency: this.currency.toString() });
    }
    get operationHint() {
        return hintNft_js_1.HINT_NFT.HINT_COLLECTION_POLICY_UPDATER_OPERATION;
    }
}
exports.CollectionPolicyUpdaterFact = CollectionPolicyUpdaterFact;
//# sourceMappingURL=updatePolicy.js.map