"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTSignFact = exports.NFTSignItem = exports.NFTSigners = exports.NFTSigner = void 0;
const property_js_1 = require("../../types/property.js");
const error_js_1 = require("../../utils/error.js");
const fact_js_1 = require("../../types/fact.js");
const config_js_1 = require("../../utils/config.js");
const hintNft_js_1 = require("../../types/hintNft.js");
const math_js_1 = require("../../utils/math.js");
const math_js_2 = require("../../utils/math.js");
const address_js_1 = require("../../account/address.js");
const item_js_1 = require("./item.js");
class NFTSigner {
    constructor(account, share) {
        this.hint = new property_js_1.Hint(hintNft_js_1.HINT_NFT.HINT_NFT_SIGNER);
        this.account = new address_js_1.Address(account);
        this.share = new math_js_2.Big(share);
        error_js_1.Assert.check(config_js_1.MitumConfig.MAX_NFT_SIGNER_SHARE.satisfy(this.share.v), error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "NFT-signer's share is out of range."));
        this.signed = false;
    }
    toBuffer() {
        return Buffer.concat([
            this.account.toBuffer(),
            this.share.toBuffer(),
            this.signed ? Buffer.from([1]) : Buffer.from([0]),
        ]);
    }
    toHintedObject() {
        return {
            _hint: this.hint.toString(),
            account: this.account.toString(),
            share: this.share.v,
            signed: this.signed,
        };
    }
}
exports.NFTSigner = NFTSigner;
class NFTSigners {
    constructor(total, signers) {
        this.hint = new property_js_1.Hint(hintNft_js_1.HINT_NFT.HINT_NFT_SIGNERS);
        this.total = new math_js_2.Big(total);
        error_js_1.Assert.check(config_js_1.MitumConfig.MAX_NFT_SIGNERS_TOTAL.satisfy(this.total.v), error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "Total NFT-signers are out of range."));
        error_js_1.Assert.check(Array.isArray(signers), error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The type of 'signers' must be of type 'Array'."));
        const signerSet = new Set(signers.map((s) => {
            error_js_1.Assert.check(s instanceof NFTSigner, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "NFTSigner's type is incorrect."));
            return s.account.toString();
        }));
        error_js_1.Assert.check(signerSet.size === signers.length, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "A duplicate value exists in the signers."));
        const sum = signers.reduce((prev, s) => prev + s.share.v, 0);
        error_js_1.Assert.check(sum === this.total.v, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The sum of 'share' does not equal total."));
        this.signers = signers;
    }
    toBuffer() {
        return Buffer.concat([
            this.total.toBuffer(),
            Buffer.concat(this.signers.sort(math_js_1.SortFunc).map((s) => s.toBuffer())),
        ]);
    }
    toHintedObject() {
        return {
            _hint: this.hint.toString(),
            total: this.total.v,
            signers: this.signers.sort(math_js_1.SortFunc).map((s) => s.toHintedObject()),
        };
    }
}
exports.NFTSigners = NFTSigners;
class NFTSignItem extends item_js_1.NFTItem {
    constructor(contract, collection, nft, currency) {
        super(hintNft_js_1.HINT_NFT.HINT_NFT_SIGN_ITEM, contract, collection, currency);
        this.nft = new math_js_2.Big(nft);
    }
    toBuffer() {
        return Buffer.concat([
            super.toBuffer(),
            this.nft.toBuffer(),
            this.currency.toBuffer(),
        ]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { contract: this.contract.toString(), collection: this.collection.toString(), currency: this.currency.toString(), nft: this.nft.v });
    }
    toString() {
        return this.nft.toString();
    }
}
exports.NFTSignItem = NFTSignItem;
class NFTSignFact extends fact_js_1.OperationFact {
    constructor(token, sender, items) {
        super(hintNft_js_1.HINT_NFT.HINT_NFT_SIGN_OPERATION_FACT, token, sender, items);
        items.forEach((item) => {
            error_js_1.Assert.check(item instanceof NFTSignItem, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "Not NFTSignItem's instance."));
            error_js_1.Assert.check(item.contract.toString() !== sender, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The contract address is the same as the sender address."));
        });
        const iSet = new Set(items.map((item) => item.toString()));
        error_js_1.Assert.check(iSet.size === items.length, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "A duplicate value exists in the NFTSignItems Array."));
    }
    get operationHint() {
        return hintNft_js_1.HINT_NFT.HINT_NFT_SIGN_OPERATION;
    }
}
exports.NFTSignFact = NFTSignFact;
//# sourceMappingURL=sign.js.map