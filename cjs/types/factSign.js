"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.M2NodeFactSign = exports.M2FactSign = exports.FactSign = void 0;
const bs58_1 = __importDefault(require("bs58"));
const error_js_1 = require("../utils/error.js");
const time_js_1 = require("../utils/time.js");
const address_js_1 = require("../account/address.js");
const publicKey_js_1 = require("../account/publicKey.js");
class FactSign {
    constructor(signer, signature, signedAt) {
        this.signature = signature;
        this.signedAt = new time_js_1.FullTimeStamp(signedAt);
        this.signer = publicKey_js_1.Key.from(signer);
        error_js_1.Assert.get(this.signer.isPriv, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PUBLIC_KEY, "not public key"))
            .not()
            .excute();
    }
    toBuffer() {
        return Buffer.concat([
            this.signer.toBuffer(),
            this.signature,
            this.signedAt.toBuffer("super"),
        ]);
    }
    toHintedObject() {
        return {
            signer: this.signer.toString(),
            signature: bs58_1.default.encode(this.signature),
            signed_at: this.signedAt.ISO(),
        };
    }
}
exports.FactSign = FactSign;
class M2FactSign extends FactSign {
    constructor(signer, signature, signedAt) {
        super(signer, signature, signedAt);
    }
    toHintedObject() {
        return super.toHintedObject();
    }
}
exports.M2FactSign = M2FactSign;
class M2NodeFactSign extends FactSign {
    constructor(node, signer, signature, signedAt) {
        super(signer, signature, signedAt);
        this.node = address_js_1.NodeAddress.from(node);
    }
    toBuffer() {
        return Buffer.concat([this.node.toBuffer(), super.toBuffer()]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { node: this.node.toString() });
    }
}
exports.M2NodeFactSign = M2NodeFactSign;
//# sourceMappingURL=factSign.js.map