"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionPolicy = exports.CollectionName = exports.PaymentParam = exports.NFTURI = void 0;
const error_js_1 = require("../../utils/error.js");
const config_js_1 = require("../../utils/config.js");
const hintNft_js_1 = require("../../types/hintNft.js");
const math_js_1 = require("../../utils/math.js");
const property_js_1 = require("../../types/property.js");
const math_js_2 = require("../../utils/math.js");
const address_js_1 = require("../../account/address.js");
class NFTURI {
    constructor(s) {
        error_js_1.Assert.check(config_js_1.MitumConfig.MAX_URI_LENGTH.satisfy(s.length), error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "NFT-URI's length is out of range."));
        this.s = s;
    }
    toBuffer() {
        return Buffer.from(this.s);
    }
    toString() {
        return this.s;
    }
}
exports.NFTURI = NFTURI;
class PaymentParam {
    constructor(param) {
        this.param = new math_js_2.Big(param);
        error_js_1.Assert.check(config_js_1.MitumConfig.PAYMENT_PARAM.satisfy(this.param.v), error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "PaymentParam's size is out of range."));
    }
    toBuffer() {
        return this.param.toBuffer();
    }
    get v() {
        return this.param.v;
    }
}
exports.PaymentParam = PaymentParam;
class CollectionName {
    constructor(s) {
        error_js_1.Assert.check(typeof s === "string", error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "Collection-name's type must be of type 'string'."));
        error_js_1.Assert.check(config_js_1.MitumConfig.COLLECTION_NAME_LENGTH.satisfy(s.length), error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "Collection-name's length is out of range."));
        this.s = s;
    }
    equal(name) {
        if (!name) {
            return false;
        }
        if (!(name instanceof CollectionName)) {
            return false;
        }
        return this.toString() === name.toString();
    }
    toBuffer() {
        return Buffer.from(this.s);
    }
    toString() {
        return this.s;
    }
}
exports.CollectionName = CollectionName;
class CollectionPolicy {
    constructor(name, royalty, uri, whites) {
        this.hint = new property_js_1.Hint(hintNft_js_1.HINT_NFT.HINT_COLLECTION_POLICY);
        this.name = new CollectionName(name);
        this.royalty = new PaymentParam(royalty);
        this.uri = new NFTURI(uri);
        error_js_1.Assert.check(Array.isArray(whites), error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "White-lists is not Array."));
        error_js_1.Assert.check(config_js_1.MitumConfig.MAX_WHITELIST_IN_COLLECTION.satisfy(whites.length), error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "White-lists length is out of range."));
        this.whites = whites.map((w) => {
            error_js_1.Assert.check(typeof w === "string" || w instanceof address_js_1.Address, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "White-list's type is incorrect."));
            return typeof w === "string" ? new address_js_1.Address(w) : w;
        });
        const wset = new Set(this.whites);
        error_js_1.Assert.check(wset.size === whites.length, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "A duplicate value exists in the white-lists."));
    }
    toBuffer() {
        return Buffer.concat([
            this.name.toBuffer(),
            this.royalty.toBuffer(),
            this.uri.toBuffer(),
            Buffer.concat(this.whites.sort(math_js_1.SortFunc).map((w) => w.toBuffer())),
        ]);
    }
    toHintedObject() {
        return {
            _hint: this.hint.toString(),
            name: this.name.toString(),
            royalty: this.royalty.v,
            uri: this.uri.toString(),
            whites: this.whites.sort(math_js_1.SortFunc).map((w) => w.toString()),
        };
    }
}
exports.CollectionPolicy = CollectionPolicy;
//# sourceMappingURL=policy.js.map