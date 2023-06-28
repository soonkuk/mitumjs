/// <reference types="node" />
import { HintedObject, IBuffer, IString } from "../../types/interface.js";
import { IHintedObject } from "../../types/interface.js";
import { Hint } from "../../types/property.js";
import { Address } from "../../account/address.js";
export declare class NFTURI implements IBuffer, IString {
    private s;
    constructor(s: string);
    toBuffer(): Buffer;
    toString(): string;
}
export declare class PaymentParam implements IBuffer {
    private param;
    constructor(param: string | number | Buffer | BigInt | Uint8Array);
    toBuffer(): Buffer;
    get v(): number;
}
export declare class CollectionName implements IBuffer, IString {
    private s;
    constructor(s: string);
    equal(name: CollectionName | string): boolean;
    toBuffer(): Buffer;
    toString(): string;
}
export declare class CollectionPolicy implements IBuffer, IHintedObject {
    readonly hint: Hint;
    readonly name: CollectionName;
    readonly royalty: PaymentParam;
    readonly uri: NFTURI;
    readonly whites: Address[];
    constructor(name: string, royalty: string | number | Buffer | BigInt | Uint8Array, uri: string, whites: string[] | Address[]);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
}
