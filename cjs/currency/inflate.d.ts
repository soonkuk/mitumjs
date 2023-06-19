/// <reference types="node" />
import { HintedObject } from "../types/interface";
import { Amount } from "../types/property";
import { FactJson } from "../types/iFact";
import { NodeFact } from "../types/fact";
import { Item } from "../types/item";
import { Address } from "../account/address";
export declare class SuffrageInflationItem extends Item {
    readonly amount: Amount;
    readonly receiver: Address;
    constructor(receiver: string | Address, amount: Amount);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
    toString(): string;
}
export declare class SuffrageInflationFact extends NodeFact {
    readonly items: SuffrageInflationItem[];
    constructor(token: string, items: SuffrageInflationItem[]);
    toBuffer(): Buffer;
    toHintedObject(): FactJson;
    get operationHint(): string;
}
