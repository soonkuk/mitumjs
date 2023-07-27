import sha3js from "js-sha3";
const { sha3_256, keccak256: keccak_256 } = sha3js;
import { sha256 as nobleSha256 } from "@noble/hashes/sha256";
import bigInt from "big-integer";
import Int64 from "int64-buffer";
import { Assert, ECODE, MitumError } from "./error.js";
export const sha256 = (msg) => Buffer.from(nobleSha256(msg));
export const sha3 = (msg) => Buffer.from(sha3_256.create().update(msg).digest());
export const keccak256 = (msg) => Buffer.from(keccak_256.create().update(msg).digest());
export const SortFunc = (a, b) => Buffer.compare(a.toBuffer(), b.toBuffer());
export class Big {
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
                    throw MitumError.detail(ECODE.INVALID_BIG_INTEGER, "wrong big");
                }
                break;
            default:
                throw MitumError.detail(ECODE.INVALID_BIG_INTEGER, "wrong big");
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
            Assert.check(size <= 8, MitumError.detail(ECODE.INVALID_BIG_INTEGER, "big out of range"));
            return Buffer.from(new Int64.Uint64BE(this.toString()).toBuffer());
        }
        const buf = new Uint8Array(size);
        let n = bigInt(this.big);
        for (let i = size - 1; i >= 0; i--) {
            buf[i] = n.mod(256).valueOf();
            n = n.divide(256);
        }
        return Buffer.from(buf);
    }
    byteLen() {
        const bitLen = bigInt(this.big).bitLength();
        const quotient = bigInt(bitLen).divide(8);
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
export class Float {
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
export class Uint8 {
    constructor(n) {
        if (n < 0 || n > 255) {
            throw new Error("Out of range for uint8 type");
        }
        this.n = n;
    }
    toBuffer() {
        const buffer = Buffer.alloc(1);
        buffer.writeUint8(this.n, 0);
        return buffer;
    }
    get v() {
        return this.n;
    }
    toString() {
        return this.n.toString();
    }
}
export class Percent {
    constructor(p) {
        if (p > 100) {
            throw new Error("The value can't exceed 100 percent.");
        }
        this.p = new Uint8(p);
    }
    toBuffer() {
        return this.p.toBuffer();
    }
    toString() {
        return this.p.toString();
    }
    get v() {
        return this.p.v;
    }
}
//# sourceMappingURL=math.js.map