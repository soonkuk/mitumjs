import * as secp256k1 from "@noble/secp256k1";
import base58 from "bs58";
import secureRandom from "secure-random";
import ethWallet from "ethereumjs-wallet";
import { getPublicCompressed } from "eccrypto-js";
import { KeyPair } from "./iPair";
import { Key } from "./publicKey";
import { SUFFIX } from "../types/hint";
import { MitumConfig } from "../utils/config";
import { ECODE, MitumError, StringAssert } from "../utils/error";
export class M2KeyPair extends KeyPair {
    constructor(privateKey) {
        super(Key.from(privateKey));
    }
    getSigner() {
        if (this.privateKey.type === "btc") {
            return Buffer.from(base58.decode(this.privateKey.noSuffix));
        }
        return ethWallet.fromPrivateKey(Buffer.from(this.privateKey.noSuffix, "hex"));
    }
    getPub() {
        if (this.privateKey.type === "btc") {
            return new Key(base58.encode(getPublicCompressed(Buffer.from(this.signer))) + SUFFIX.KEY_PUBLIC);
        }
        return new Key("04" +
            this.signer.getPublicKeyString().substring(2) +
            SUFFIX.KEY_ETHER_PUBLIC);
    }
}
M2KeyPair.generator = {
    random(option) {
        if (option === "btc") {
            return new M2KeyPair(base58.encode(Buffer.from(secureRandom(32, { type: "Uint8Array" }))) +
                SUFFIX.KEY_PRIVATE);
        }
        return new M2KeyPair(ethWallet.generate().getPrivateKeyString().substring(2) +
            SUFFIX.KEY_ETHER_PRIVATE);
    },
    fromPrivate(key) {
        return new M2KeyPair(key);
    },
    fromSeed(seed, option) {
        StringAssert.with(seed, MitumError.detail(ECODE.INVALID_SEED, "seed length out of range"))
            .satisfyConfig(MitumConfig.SEED)
            .excute();
        if (option === "btc") {
            return new M2KeyPair(base58.encode(secp256k1.utils.hexToBytes(KeyPair.from(seed).toString(16))) + SUFFIX.KEY_PRIVATE);
        }
        return new M2KeyPair(KeyPair.from(seed).toString(16) + SUFFIX.KEY_ETHER_PRIVATE);
    },
};
//# sourceMappingURL=key.js.map