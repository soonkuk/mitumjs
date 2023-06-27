/// <reference types="node" />
import EthWallet from "ethereumjs-wallet";
import { KeyPair } from "./iPair.js";
import { Key } from "./publicKey.js";
import { KeyPairType } from "../types/address.js";
export declare class M2KeyPair extends KeyPair {
    static generator: {
        random(option: KeyPairType): M2KeyPair;
        fromPrivate(key: string | Key): M2KeyPair;
        fromSeed(seed: string, option: KeyPairType): M2KeyPair;
    };
    private constructor();
    protected getSigner(): Uint8Array | EthWallet;
    protected getPub(): Key;
    sign(msg: string | Buffer): Buffer;
}
