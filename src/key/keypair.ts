import base58 from "bs58"

import ethWallet from "ethereumjs-wallet"
import secureRandom from "secure-random"
import { getPublicCompressed } from "eccrypto-js"

import { hmac } from "@noble/hashes/hmac"
import { sha256 as nobleSha256 } from "@noble/hashes/sha256"
import * as secp256k1 from "@noble/secp256k1"

import { Key } from "./pub"
import { KeyPairType } from "./types"

import { Big } from "../types"
import { Config } from "../node"
import { SUFFIX } from "../alias"
import { sha3, sha256 } from "../utils"
import { Assert, ECODE, MitumError, StringAssert } from "../error"

interface IKeyGenerator {
    random(option?: KeyPairType): BaseKeyPair
    fromPrivateKey(key: string | Key): BaseKeyPair
    fromSeed(seed: string | Buffer | Uint8Array, option?: KeyPairType): BaseKeyPair
}

export abstract class BaseKeyPair {
    readonly privateKey: Key
    readonly publicKey: Key
    protected signer: Uint8Array | ethWallet
    protected static generator: IKeyGenerator

    protected constructor(privateKey: Key) {
        this.privateKey = privateKey
        this.signer = this.getSigner()
        this.publicKey = this.getPub()

        secp256k1.utils.hmacSha256Sync = (key, ...msgs) =>
            hmac(nobleSha256, key, secp256k1.utils.concatBytes(...msgs))
        secp256k1.utils.sha256Sync = (...msgs) =>
            nobleSha256(secp256k1.utils.concatBytes(...msgs))
    }

    abstract sign(msg: string | Buffer): Buffer
    abstract verify(sig: string | Buffer, msg: string | Buffer): boolean

    protected abstract getSigner(): Uint8Array | ethWallet
    protected abstract getPub(): Key

    static random<T extends BaseKeyPair>(option?: KeyPairType): T {
        return this.generator.random(option) as T
    }

    static fromPrivateKey<T extends BaseKeyPair>(key: string | Key): T {
        return this.generator.fromPrivateKey(key) as T
    }

    static fromSeed<T extends BaseKeyPair>(seed: string | Buffer | Uint8Array, option?: KeyPairType): T {
        return this.generator.fromSeed(seed, option) as  T
    }

    protected btcSign(msg: string | Buffer): Buffer {
        return Buffer.from(secp256k1.signSync(sha256(sha256(msg)), this.signer as Uint8Array))
    }

    protected ethSign(msg: string | Buffer): Buffer {
        const sig = secp256k1.signSync(nobleSha256(msg), (this.signer as ethWallet).getPrivateKey())

        const rlen = sig[3]
        const r = sig.slice(4, 4 + rlen)
        const slen = sig[5 + rlen]
        const s = sig.slice(6 + rlen)

        const brlen = new Big(rlen).toBuffer("fill")

        const buf = Buffer.alloc(rlen + slen + 4)
        brlen.copy(buf, 0, 0, 4)

        Buffer.from(r).copy(buf, 4, 0, rlen)
        Buffer.from(s).copy(buf, rlen + 4, 0, slen)

        return buf
    }

    protected btcVerify(sig: string | Buffer, msg: string | Buffer): boolean {
        if (typeof sig === "string") {
            sig = Buffer.from(base58.decode(sig))
        }

        return secp256k1.verify(sig, sha256(sha256(msg)), secp256k1.getPublicKey(this.signer as Uint8Array))
    }

    protected ethVerify(sig: string | Buffer, msg: string | Buffer): boolean {
        if (typeof sig === "string") {
            sig = Buffer.from(base58.decode(sig))
        }

        const rlen = new Big(sig.subarray(0, 4).reverse())
        const r = Buffer.alloc(rlen.v)

        const rb = new Big(sig.subarray(4, 4 + rlen.v))
        rb.toBuffer().copy(r, rlen.v - rb.byteLen())

        const s = sig.subarray(4 + rlen.v)
        const slen = new Big(s.length)

        const base = Buffer.from([48, sig.length, 2])

        const buf = Buffer.alloc(sig.length + 2)
        base.copy(buf, 0, 0, 4)

        rlen.toBuffer().copy(buf, 3)
        r.copy(buf, 4)

        Buffer.from([2]).copy(buf, 4 + rlen.v)

        slen.toBuffer().copy(buf, 5 + rlen.v)
        s.copy(buf, 6 + rlen.v)

        return secp256k1.verify(buf, sha256(msg), secp256k1.getPublicKey((this.signer as ethWallet).getPrivateKey()))

    }

    protected static K(seed: string | Buffer | Uint8Array): bigint {
        seed = Buffer.from(base58.encode(sha3(Buffer.from(seed))))

        Assert.check(40 <= seed.length, MitumError.detail(ECODE.INVALID_SEED, "seed length out of range"))
        seed = seed.subarray(0, 40)

        const N = secp256k1.CURVE.n - BigInt(1)
        let k = new Big(seed).big
        k %= N
        k += BigInt(1)
        return k
    }
}

export class KeyPair extends BaseKeyPair {
    static generator = {
        random(option?: KeyPairType): KeyPair {
            option = option ?? "btc"
    
            if (option === "btc") {
                return new KeyPair(
                    base58.encode(Buffer.from(secureRandom(32, { type: "Uint8Array" }))) + SUFFIX.KEY.MITUM.PRIVATE
                )
            }
    
            return new KeyPair(ethWallet.generate().getPrivateKeyString().substring(2) + SUFFIX.KEY.ETHER.PRIVATE)
        },
        fromPrivateKey(key: string | Key): KeyPair {
            return new KeyPair(key)
        },
        fromSeed(seed: string, option?: KeyPairType): KeyPair {
            option = option ?? "btc"
    
            StringAssert.with(seed, MitumError.detail(ECODE.INVALID_SEED, "seed length out of range"))
                .satisfyConfig(Config.SEED)
                .excute()
    
            if (option === "btc") {
                return new KeyPair(
                    base58.encode(secp256k1.utils.hexToBytes(BaseKeyPair.K(seed).toString(16))) + SUFFIX.KEY.MITUM.PRIVATE
                )
            }
    
            return new KeyPair(BaseKeyPair.K(seed).toString(16) + SUFFIX.KEY.ETHER.PRIVATE)
        }
    }

    private constructor(privateKey: string | Key) {
        super(Key.from(privateKey))
    }

    protected getSigner(): Uint8Array | ethWallet {
        if (this.privateKey.type === "btc") {
            return Buffer.from(base58.decode(this.privateKey.noSuffix))
        }

        return ethWallet.fromPrivateKey(Buffer.from(this.privateKey.noSuffix, 'hex'))
    }

    protected getPub(): Key {
        if (this.privateKey.type === "btc") {
            return new Key(
                base58.encode(getPublicCompressed(Buffer.from(this.signer as Uint8Array))) + SUFFIX.KEY.MITUM.PUBLIC
            )
        }

        return new Key(
            '04' + (this.signer as ethWallet).getPublicKeyString().substring(2) + SUFFIX.KEY.ETHER.PUBLIC
        )
    }

    sign(msg: string | Buffer): Buffer {
        if (this.privateKey.type === "btc") {
            return this.btcSign(msg)
        }
        return this.ethSign(msg)
    }

    verify(sig: string | Buffer, msg: string | Buffer): boolean {
        if (this.privateKey.type === "btc") {
            return this.btcVerify(sig, msg)
        }
        return this.ethVerify(sig, msg)
    }
}