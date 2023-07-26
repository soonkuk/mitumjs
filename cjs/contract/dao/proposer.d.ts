/// <reference types="node" />
import { Address } from "../../account/address.js";
import { Boolean } from "../../types/boolean.js";
import { HintedObject, IBuffer, IHintedObject } from "../../types/interface.js";
import { Hint } from "../../types/property.js";
export declare class Proposers implements IBuffer, IHintedObject {
    readonly hint: Hint;
    readonly active: Boolean;
    readonly accounts: Address[];
    constructor(active: boolean, accounts: string[]);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
}
