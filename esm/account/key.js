import * as secp256k1 from "@noble/secp256k1";
import base58 from "bs58";
import secureRandom from "secure-random";
// import EthWallet from "ethereumjs-wallet";
import { Wallet } from "ethers";
import { getPublicCompressed } from "eccrypto-js";
import { KeyPair } from "./iPair.js";
import { Key } from "./publicKey.js";
import { SUFFIX } from "../types/hint.js";
import { MitumConfig } from "../utils/config.js";
import { ECODE, MitumError, StringAssert } from "../utils/error.js";
import { privateKeyToPublicKey, compress } from "../utils/converter.js";
export class M2KeyPair extends KeyPair {
    constructor(privateKey) {
        super(Key.from(privateKey));
    }
    getSigner() {
        if (this.privateKey.type === "mitum") {
            return Buffer.from(base58.decode(this.privateKey.noSuffix));
        }
        // return EthWallet.fromPrivateKey(
        //   Buffer.from(this.privateKey.noSuffix, "hex")
        // );
        return Buffer.from(this.privateKey.noSuffix, "hex");
    }
    getPub() {
        if (this.privateKey.type === "mitum") {
            return new Key(base58.encode(getPublicCompressed(Buffer.from(this.signer))) + SUFFIX.KEY_PUBLIC);
        }
        const publickeyBuffer = privateKeyToPublicKey("0x" + this.privateKey.noSuffix);
        return new Key(compress(publickeyBuffer) + SUFFIX.KEY_ETHER_PUBLIC);
        // return new Key(
        //   "04" +
        //     (this.signer as EthWallet).getPublicKeyString().substring(2) +
        //     SUFFIX.KEY_ETHER_PUBLIC
        // );
    }
    sign(msg) {
        if (this.privateKey.type === "mitum") {
            return this.btcSign(msg);
        }
        return this.ethSign(msg);
    }
}
M2KeyPair.generator = {
    random(option) {
        if (option === "mitum") {
            return new M2KeyPair(base58.encode(Buffer.from(secureRandom(32, { type: "Uint8Array" }))) +
                SUFFIX.KEY_PRIVATE);
        }
        const randomWallet = Wallet.createRandom();
        // return new M2KeyPair(
        //   EthWallet.generate().getPrivateKeyString().substring(2) +
        //     SUFFIX.KEY_ETHER_PRIVATE
        // );
        return new M2KeyPair(randomWallet.privateKey.substring(2) + SUFFIX.KEY_ETHER_PRIVATE);
    },
    fromPrivate(key) {
        return new M2KeyPair(key);
    },
    fromSeed(seed, option) {
        StringAssert.with(seed, MitumError.detail(ECODE.INVALID_SEED, "seed length out of range"))
            .satisfyConfig(MitumConfig.SEED)
            .excute();
        if (option === "mitum") {
            return new M2KeyPair(base58.encode(secp256k1.utils.hexToBytes(KeyPair.from(seed).toString(16))) + SUFFIX.KEY_PRIVATE);
        }
        return new M2KeyPair(KeyPair.from(seed).toString(16) + SUFFIX.KEY_ETHER_PRIVATE);
    },
};
//# sourceMappingURL=key.js.map