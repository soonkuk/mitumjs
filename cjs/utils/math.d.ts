/// <reference types="node" />
import { IBuffer, IString } from "../types/interface";
type HashFunction = (msg: string | Buffer) => Buffer;
export declare const sha256: HashFunction;
export declare const sha3: HashFunction;
export declare const keccak256: HashFunction;
export declare const SortFunc: <T extends IBuffer, U extends IBuffer>(a: T, b: U) => 0 | 1 | -1;
export declare class Big implements IBuffer, IString {
    readonly big: bigint;
    constructor(big: string | number | Buffer | BigInt | Uint8Array);
    static from(big: string | number | Buffer | BigInt | Uint8Array | Big): Big;
    private bufferToBig;
    toBuffer(option?: "fill"): Buffer;
    byteLen(): number;
    get v(): number;
    toString(): string;
}
export declare class Float implements IBuffer, IString {
    readonly n: number;
    constructor(n: number);
    static from(n: number | Float): Float;
    toBuffer(): Buffer;
    toString(): string;
}
export {};
