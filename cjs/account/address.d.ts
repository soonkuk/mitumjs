/// <reference types="node" />
import { IBuffer, IString } from "../types/interface.js";
import { AddressType } from "../types/address.js";
import { CurrencyID } from "../types/property.js";
declare abstract class BaseAddress implements IBuffer, IString {
    private s;
    readonly type: AddressType;
    constructor(s: string, type?: AddressType);
    toBuffer(): Buffer;
    toString(): string;
}
export declare class Address extends BaseAddress {
    constructor(s: string);
    static from(s: string | Address): Address;
}
export declare class NodeAddress extends BaseAddress {
    constructor(s: string);
    static from(s: string | NodeAddress): NodeAddress;
}
export declare class ZeroAddress extends BaseAddress {
    readonly currency: CurrencyID;
    constructor(s: string);
    static from(s: string | ZeroAddress): ZeroAddress;
}
export {};
