/// <reference types="node" />
import EthWallet from "ethereumjs-wallet";
import { Key } from "./publicKey.js";
import { KeyPairType } from "../types/address.js";
interface IKeyGenerator {
    random(option?: KeyPairType): KeyPair;
    fromPrivate(key: string | Key): KeyPair;
    fromSeed(seed: string | Buffer | Uint8Array, option?: KeyPairType): KeyPair;
}
export declare abstract class KeyPair {
    readonly privateKey: Key;
    readonly publicKey: Key;
    protected signer: Uint8Array | EthWallet;
    protected static generator: IKeyGenerator;
    constructor(privateKey: Key);
    abstract sign(msg: string | Buffer): Buffer;
    protected abstract getSigner(): Uint8Array | EthWallet;
    protected abstract getPub(): Key;
    static random<T extends KeyPair>(option: KeyPairType): T;
    static fromPrivate<T extends KeyPair>(key: string | Key): T;
    static fromSeed<T extends KeyPair>(seed: string | Buffer | Uint8Array, option: KeyPairType): T;
    protected btcSign(msg: string | Buffer): Buffer;
    protected ethSign(msg: string | Buffer): Buffer;
    protected static from(seed: string | Buffer | Uint8Array): bigint;
}
export {};
