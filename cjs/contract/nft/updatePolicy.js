"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionPolicyUpdaterFact = void 0;
const bs58_1 = __importDefault(require("bs58"));
const address_js_1 = require("../../account/address.js");
const property_js_1 = require("../../types/property.js");
const fact_js_1 = require("../../types/fact.js");
const error_js_1 = require("../../utils/error.js");
const hintNft_js_1 = require("../../types/hintNft.js");
const config_js_1 = require("../../utils/config.js");
const math_1 = require("../../utils/math");
const policy_js_1 = require("./policy.js");
class CollectionPolicyUpdaterFact extends fact_js_1.Fact {
    constructor(token, sender, contract, collection, name, royalty, uri, whites, currency) {
        super(hintNft_js_1.HINT_NFT.HINT_COLLECTION_POLICY_UPDATER_OPERATION_FACT, token);
        error_js_1.Assert.check(contract !== sender, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The contract address is the same as the sender address."));
        this.sender = new address_js_1.Address(sender);
        this.contract = new address_js_1.Address(contract);
        this.name = new policy_js_1.CollectionName(name);
        this.royalty = new policy_js_1.PaymentParam(royalty);
        this.uri = new policy_js_1.NFTURI(uri);
        this.collection = new property_js_1.ContractID(collection);
        error_js_1.Assert.check(Array.isArray(whites), error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "'whites' is not Array."));
        error_js_1.Assert.check(config_js_1.MitumConfig.MAX_WHITELIST_IN_COLLECTION.satisfy(whites.length), error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "White-lists length is out of range."));
        this.whites = whites.map((w) => {
            error_js_1.Assert.check(typeof w === "string", error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The element type of 'white-lists' is incorrect."));
            return new address_js_1.Address(w);
        });
        const wSet = new Set(this.whites);
        error_js_1.Assert.check(wSet.size === whites.length, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "A duplicate item exists."));
        this.currency = new property_js_1.CurrencyID(currency);
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
            Buffer.concat(this.whites.sort(math_1.SortFunc).map((w) => w.toBuffer())),
        ]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { hash: bs58_1.default.encode(this.hash), token: this.token.toString(), sender: this.sender.toString(), contract: this.contract.toString(), collection: this.collection.toString(), name: this.name.toString(), royalty: this.royalty.v, uri: this.uri.toString(), whites: this.whites.sort(math_1.SortFunc).map((w) => w.toString()), currency: this.currency.toString() });
    }
    get operationHint() {
        return hintNft_js_1.HINT_NFT.HINT_COLLECTION_POLICY_UPDATER_OPERATION;
    }
}
exports.CollectionPolicyUpdaterFact = CollectionPolicyUpdaterFact;
//# sourceMappingURL=updatePolicy.js.map