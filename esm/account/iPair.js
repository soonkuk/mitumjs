import { hmac } from "@noble/hashes/hmac";
import * as secp256k1 from "@noble/secp256k1";
import { sha256 as nobleSha256 } from "@noble/hashes/sha256";
import base58 from "bs58";
import * as crypto from "crypto";
import { ec as EC } from "elliptic";
const ec = new EC("secp256k1");
import { sha3, sha256, Big } from "../utils/math.js";
import { Assert, ECODE, MitumError } from "../utils/error.js";
export class KeyPair {
    constructor(privateKey) {
        this.privateKey = privateKey;
        this.signer = this.getSigner();
        this.publicKey = this.getPub();
        secp256k1.utils.hmacSha256Sync = (key, ...msgs) => hmac(nobleSha256, key, secp256k1.utils.concatBytes(...msgs));
        secp256k1.utils.sha256Sync = (...msgs) => nobleSha256(secp256k1.utils.concatBytes(...msgs));
    }
    static random(option) {
        return this.generator.random(option);
    }
    static fromPrivate(key) {
        return this.generator.fromPrivate(key);
    }
    static fromSeed(seed, option) {
        return this.generator.fromSeed(seed, option);
    }
    btcSign(msg) {
        return Buffer.from(secp256k1.signSync(sha256(sha256(msg)), this.signer));
    }
    ethSign(msg) {
        const key = ec.keyFromPrivate(this.privateKey.noSuffix, "hex");
        const msgHash = crypto.createHash("sha256").update(msg).digest();
        const signature = key.sign(msgHash);
        const r = Buffer.from(signature.r.toArray());
        const s = Buffer.from(signature.s.toArray());
        // const sig = secp256k1.signSync(
        //   crypto.createHash("sha256").update(msg).digest(),
        //   this.signer
        // );
        // const r = Buffer.from(signature.slice(0, 32));
        // const s = Buffer.from(signature.slice(32, 64));
        const sigLength = 4 + r.length + s.length;
        const sigBuffer = Buffer.alloc(sigLength);
        sigBuffer.writeUInt32LE(r.length, 0);
        sigBuffer.set(r, 4);
        sigBuffer.set(s, 4 + r.length);
        return sigBuffer;
        // const sig = secp256k1.signSync(
        //   nobleSha256(msg),
        //   // (this.signer as EthWallet).getPrivateKey()
        //   this.signer
        // );
        // const rlen = sig[3];
        // const r = sig.slice(4, 4 + rlen);
        // const slen = sig[5 + rlen];
        // const s = sig.slice(6 + rlen);
        // const brlen = new Big(rlen).toBuffer();
        // const buf = Buffer.alloc(rlen + slen + 4);
        // brlen.copy(buf, 0, 0, 4);
        // Buffer.from(r).copy(buf, 4, 0, rlen);
        // Buffer.from(s).copy(buf, rlen + 4, 0, slen);
        // return buf;
    }
    // from seed
    static from(seed) {
        seed = Buffer.from(base58.encode(sha3(Buffer.from(seed))));
        Assert.check(40 <= seed.length, MitumError.detail(ECODE.INVALID_SEED, "seed length out of range"));
        seed = seed.subarray(0, 40);
        const N = secp256k1.CURVE.n - BigInt(1);
        let k = new Big(seed).big;
        k %= N;
        k += BigInt(1);
        return k;
    }
}
//# sourceMappingURL=iPair.js.map