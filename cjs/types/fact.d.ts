/// <reference types="node" />
import { Item } from "./item.js";
import { FactJson } from "./iFact.js";
import { Address } from "../account/address.js";
import { Token } from "./property.js";
import { IBuffer, IHintedObject } from "./interface.js";
export declare abstract class Fact implements IBuffer, IHintedObject {
    private hint;
    readonly token: Token;
    protected _hash: Buffer;
    readonly items?: Item[];
    constructor(hint: string, token: string);
    get hash(): Buffer;
    hashing(): Buffer;
    toBuffer(): Buffer;
    toHintedObject(): FactJson;
    abstract get operationHint(): string;
}
export declare abstract class OperationFact<T extends Item> extends Fact {
    readonly sender: Address;
    readonly items: T[];
    constructor(hint: string, token: string, sender: string | Address, items: T[]);
    toBuffer(): Buffer;
    toHintedObject(): FactJson;
}
export declare abstract class NodeFact extends Fact {
    constructor(hint: string, token: string);
}
