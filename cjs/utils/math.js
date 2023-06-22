"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Float = exports.Big = exports.SortFunc = exports.keccak256 = exports.sha3 = exports.sha256 = void 0;
const js_sha3_1 = __importDefault(require("js-sha3"));
const { sha3_256, keccak256: keccak_256 } = js_sha3_1.default;
const sha256_1 = require("@noble/hashes/sha256");
const big_integer_1 = __importDefault(require("big-integer"));
const int64_buffer_1 = __importDefault(require("int64-buffer"));
const error_js_1 = require("./error.js");
const sha256 = (msg) => Buffer.from((0, sha256_1.sha256)(msg));
exports.sha256 = sha256;
const sha3 = (msg) => Buffer.from(sha3_256.create().update(msg).digest());
exports.sha3 = sha3;
const keccak256 = (msg) => Buffer.from(keccak_256.create().update(msg).digest());
exports.keccak256 = keccak256;
const SortFunc = (a, b) => Buffer.compare(a.toBuffer(), b.toBuffer());
exports.SortFunc = SortFunc;
class Big {
    constructor(big) {
        switch (typeof big) {
            case "number":
            case "string":
            case "bigint":
                this.big = BigInt(big);
                break;
            case "object":
                if (big instanceof Buffer || big instanceof Uint8Array) {
                    this.big = this.bufferToBig(big);
                }
                else {
                    throw error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_BIG_INTEGER, "wrong big");
                }
                break;
            default:
                throw error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_BIG_INTEGER, "wrong big");
        }
    }
    static from(big) {
        return big instanceof Big ? big : new Big(big);
    }
    bufferToBig(big) {
        const res = [];
        Uint8Array.from(big).forEach((n) => {
            let s = n.toString(16);
            s.length % 2 ? res.push("0" + s) : res.push(s);
        });
        return BigInt("0x" + res.join(""));
    }
    toBuffer(option) {
        const size = this.byteLen();
        if (option === "fill") {
            error_js_1.Assert.check(size <= 8, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_BIG_INTEGER, "big out of range"));
            return Buffer.from(new int64_buffer_1.default.Uint64BE(this.toString()).toBuffer());
        }
        const buf = new Uint8Array(size);
        let n = (0, big_integer_1.default)(this.big);
        for (let i = size - 1; i >= 0; i--) {
            buf[i] = n.mod(256).valueOf();
            n = n.divide(256);
        }
        return Buffer.from(buf);
    }
    byteLen() {
        const bitLen = (0, big_integer_1.default)(this.big).bitLength();
        const quotient = (0, big_integer_1.default)(bitLen).divide(8);
        if (bitLen.valueOf() - quotient.valueOf() * 8 > 0) {
            return quotient.valueOf() + 1;
        }
        return quotient.valueOf();
    }
    get v() {
        if (this.big <= BigInt(Number.MAX_SAFE_INTEGER)) {
            return parseInt(this.toString());
        }
        return -1;
    }
    toString() {
        return this.big.toString();
    }
}
exports.Big = Big;
class Float {
    constructor(n) {
        this.n = n;
    }
    static from(n) {
        return n instanceof Float ? n : new Float(n);
    }
    toBuffer() {
        const b = Buffer.allocUnsafe(8);
        b.writeDoubleBE(this.n);
        return b;
    }
    toString() {
        return "" + this.n;
    }
}
exports.Float = Float;
//# sourceMappingURL=math.js.map