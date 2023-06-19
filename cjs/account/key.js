"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.M2KeyPair = void 0;
const secp256k1 = __importStar(require("@noble/secp256k1"));
const bs58_1 = __importDefault(require("bs58"));
const secure_random_1 = __importDefault(require("secure-random"));
const ethereumjs_wallet_1 = __importDefault(require("ethereumjs-wallet"));
const eccrypto_js_1 = require("eccrypto-js");
const iPair_1 = require("./iPair");
const publicKey_1 = require("./publicKey");
const hint_1 = require("../types/hint");
const config_1 = require("../utils/config");
const error_1 = require("../utils/error");
class M2KeyPair extends iPair_1.KeyPair {
    constructor(privateKey) {
        super(publicKey_1.Key.from(privateKey));
    }
    getSigner() {
        if (this.privateKey.type === "btc") {
            return Buffer.from(bs58_1.default.decode(this.privateKey.noSuffix));
        }
        return ethereumjs_wallet_1.default.fromPrivateKey(Buffer.from(this.privateKey.noSuffix, "hex"));
    }
    getPub() {
        if (this.privateKey.type === "btc") {
            return new publicKey_1.Key(bs58_1.default.encode((0, eccrypto_js_1.getPublicCompressed)(Buffer.from(this.signer))) + hint_1.SUFFIX.KEY_PUBLIC);
        }
        return new publicKey_1.Key("04" +
            this.signer.getPublicKeyString().substring(2) +
            hint_1.SUFFIX.KEY_ETHER_PUBLIC);
    }
    sign(msg) {
        if (this.privateKey.type === "btc") {
            return this.btcSign(msg);
        }
        return this.ethSign(msg);
    }
}
exports.M2KeyPair = M2KeyPair;
M2KeyPair.generator = {
    random(option) {
        if (option === "btc") {
            return new M2KeyPair(bs58_1.default.encode(Buffer.from((0, secure_random_1.default)(32, { type: "Uint8Array" }))) +
                hint_1.SUFFIX.KEY_PRIVATE);
        }
        return new M2KeyPair(ethereumjs_wallet_1.default.generate().getPrivateKeyString().substring(2) +
            hint_1.SUFFIX.KEY_ETHER_PRIVATE);
    },
    fromPrivate(key) {
        return new M2KeyPair(key);
    },
    fromSeed(seed, option) {
        error_1.StringAssert.with(seed, error_1.MitumError.detail(error_1.ECODE.INVALID_SEED, "seed length out of range"))
            .satisfyConfig(config_1.MitumConfig.SEED)
            .excute();
        if (option === "btc") {
            return new M2KeyPair(bs58_1.default.encode(secp256k1.utils.hexToBytes(iPair_1.KeyPair.from(seed).toString(16))) + hint_1.SUFFIX.KEY_PRIVATE);
        }
        return new M2KeyPair(iPair_1.KeyPair.from(seed).toString(16) + hint_1.SUFFIX.KEY_ETHER_PRIVATE);
    },
};
//# sourceMappingURL=key.js.map