/// <reference types="node" />
import { HintedObject } from "../types/interface.js";
import { Amount } from "../types/property.js";
import { FactJson } from "../types/iFact.js";
import { NodeFact } from "../types/fact.js";
import { Item } from "../types/item.js";
import { Address } from "../account/address.js";
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
