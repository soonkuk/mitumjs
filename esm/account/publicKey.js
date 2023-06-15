import base58 from "bs58";
import { Address } from "./address";
import { Big, keccak256, sha3 } from "../utils/math";
import { MitumConfig } from "../utils/config";
import { Hint } from "../types/property";
import { HINT, SUFFIX } from "../types/hint";
import { Assert, ECODE, MitumError, StringAssert } from "../utils/error";
export class Key {
    constructor(s) {
        StringAssert.with(s, MitumError.detail(ECODE.INVALID_KEY, "invalid key"))
            .empty()
            .not()
            .chainOr(s.endsWith(SUFFIX.KEY_PRIVATE) &&
            MitumConfig.KEY.M2.PRIVATE.satisfy(s.length), s.endsWith(SUFFIX.KEY_ETHER_PRIVATE) &&
            MitumConfig.KEY.M2ETHER.PRIVATE.satisfy(s.length), s.endsWith(SUFFIX.KEY_PUBLIC) &&
            MitumConfig.KEY.M2.PUBLIC.satisfy(s.length), s.endsWith(SUFFIX.KEY_ETHER_PUBLIC) &&
            MitumConfig.KEY.M2ETHER.PUBLIC.satisfy(s.length))
            .excute();
        this.key = s.substring(0, s.length - MitumConfig.SUFFIX.DEFAULT.value);
        this.suffix = s.substring(s.length - MitumConfig.SUFFIX.DEFAULT.value);
        this.version = "m2";
        this.type =
            s.endsWith(SUFFIX.KEY_ETHER_PRIVATE) ||
                s.endsWith(SUFFIX.KEY_ETHER_PUBLIC)
                ? "ether"
                : "btc";
        this.isPriv =
            s.endsWith(SUFFIX.KEY_PRIVATE) || s.endsWith(SUFFIX.KEY_ETHER_PRIVATE);
    }
    static from(s) {
        return s instanceof Key ? s : new Key(s);
    }
    get noSuffix() {
        return this.key;
    }
    toBuffer() {
        return Buffer.from(this.toString());
    }
    toString() {
        return this.key + this.suffix;
    }
}
export class PubKey extends Key {
    constructor(key, weight) {
        super(typeof key === "string" ? key : key.toString());
        this.weight = Big.from(weight);
        Assert.check(MitumConfig.WEIGHT.satisfy(this.weight.v), MitumError.detail(ECODE.INVALID_PUBLIC_KEY, "weight out of range"));
    }
    toBuffer() {
        return Buffer.concat([super.toBuffer(), this.weight.toBuffer("fill")]);
    }
    toHintedObject() {
        return {
            _hint: PubKey.hint.toString(),
            weight: this.weight.v,
            key: this.toString(),
        };
    }
}
PubKey.hint = new Hint(HINT.KEY);
export class Keys {
    constructor(keys, threshold) {
        Assert.check(MitumConfig.KEYS_IN_ACCOUNT.satisfy(keys.length), MitumError.detail(ECODE.INVALID_KEYS, "keys length out of range"));
        this._keys = keys.map((k) => {
            if (k instanceof PubKey) {
                return k;
            }
            const [key, weight] = k;
            return new PubKey(key instanceof Key ? key.toString() : key, weight);
        });
        this.threshold = threshold instanceof Big ? threshold : new Big(threshold);
        Assert.check(MitumConfig.THRESHOLD.satisfy(this.threshold.v), MitumError.detail(ECODE.INVALID_KEYS, "threshold out of range"));
        Assert.check(new Set(this._keys.map((k) => k.toString())).size === this._keys.length, MitumError.detail(ECODE.INVALID_KEYS, "duplicate keys found in keys"));
    }
    get keys() {
        return this._keys;
    }
    get address() {
        return new Address(base58.encode(sha3(this.toBuffer())) + SUFFIX.ACCOUNT_ADDRESS);
    }
    get etherAddress() {
        return new Address(keccak256(this.toBuffer()).subarray(12).toString("hex") +
            SUFFIX.ETHER_ACCOUNT_ADDRESS);
    }
    toBuffer() {
        return Buffer.concat([
            Buffer.concat(this._keys
                .sort((a, b) => Buffer.compare(Buffer.from(a.toString()), Buffer.from(b.toBuffer())))
                .map((k) => k.toBuffer())),
            this.threshold.toBuffer("fill"),
        ]);
    }
    toHintedObject() {
        return {
            _hint: Keys.hint.toString(),
            hash: base58.encode(sha3(this.toBuffer())),
            keys: this._keys
                .sort((a, b) => Buffer.compare(Buffer.from(a.toString()), Buffer.from(b.toBuffer())))
                .map((k) => k.toHintedObject()),
            threshold: this.threshold.v,
        };
    }
}
Keys.hint = new Hint(HINT.KEYS);
//# sourceMappingURL=publicKey.js.map