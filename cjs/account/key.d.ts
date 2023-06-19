/// <reference types="node" />
import ethWallet from "ethereumjs-wallet";
import { KeyPair } from "./iPair";
import { Key } from "./publicKey";
import { KeyPairType } from "../types/address";
export declare class M2KeyPair extends KeyPair {
    static generator: {
        random(option: KeyPairType): M2KeyPair;
        fromPrivate(key: string | Key): M2KeyPair;
        fromSeed(seed: string, option: KeyPairType): M2KeyPair;
    };
    private constructor();
    protected getSigner(): Uint8Array | ethWallet;
    protected getPub(): Key;
    sign(msg: string | Buffer): Buffer;
}
