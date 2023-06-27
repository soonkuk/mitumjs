import * as secp256k1 from "@noble/secp256k1";

import base58 from "bs58";
import secureRandom from "secure-random";
import EthWallet from "ethereumjs-wallet";
import { getPublicCompressed } from "eccrypto-js";

import { KeyPair } from "./iPair.js";
import { Key } from "./publicKey.js";

import { SUFFIX } from "../types/hint.js";
import { KeyPairType } from "../types/address.js";

import { MitumConfig } from "../utils/config.js";
import { ECODE, MitumError, StringAssert } from "../utils/error.js";

export class M2KeyPair extends KeyPair {
  static generator = {
    random(option: KeyPairType): M2KeyPair {
      if (option === "btc") {
        return new M2KeyPair(
          base58.encode(Buffer.from(secureRandom(32, { type: "Uint8Array" }))) +
            SUFFIX.KEY_PRIVATE
        );
      }

      return new M2KeyPair(
        EthWallet.generate().getPrivateKeyString().substring(2) +
          SUFFIX.KEY_ETHER_PRIVATE
      );
    },

    fromPrivate(key: string | Key): M2KeyPair {
      return new M2KeyPair(key);
    },

    fromSeed(seed: string, option: KeyPairType): M2KeyPair {
      StringAssert.with(
        seed,
        MitumError.detail(ECODE.INVALID_SEED, "seed length out of range")
      )
        .satisfyConfig(MitumConfig.SEED)
        .excute();

      if (option === "btc") {
        return new M2KeyPair(
          base58.encode(
            secp256k1.utils.hexToBytes(KeyPair.from(seed).toString(16))
          ) + SUFFIX.KEY_PRIVATE
        );
      }

      return new M2KeyPair(
        KeyPair.from(seed).toString(16) + SUFFIX.KEY_ETHER_PRIVATE
      );
    },
  };

  private constructor(privateKey: string | Key) {
    super(Key.from(privateKey));
  }

  protected getSigner(): Uint8Array | EthWallet {
    if (this.privateKey.type === "btc") {
      return Buffer.from(base58.decode(this.privateKey.noSuffix));
    }

    return EthWallet.fromPrivateKey(
      Buffer.from(this.privateKey.noSuffix, "hex")
    );
  }

  protected getPub(): Key {
    if (this.privateKey.type === "btc") {
      return new Key(
        base58.encode(
          getPublicCompressed(Buffer.from(this.signer as Uint8Array))
        ) + SUFFIX.KEY_PUBLIC
      );
    }

    return new Key(
      "04" +
        (this.signer as EthWallet).getPublicKeyString().substring(2) +
        SUFFIX.KEY_ETHER_PUBLIC
    );
  }

  sign(msg: string | Buffer): Buffer {
    if (this.privateKey.type === "btc") {
      return this.btcSign(msg);
    }
    return this.ethSign(msg);
  }
}
