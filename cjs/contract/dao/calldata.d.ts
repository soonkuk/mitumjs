/// <reference types="node" />
import { Address } from "../../account/address.js";
import { HintedObject, IBuffer, IHintedObject } from "../../types/interface.js";
import { Amount, Hint } from "../../types/property.js";
import { Policy } from "./policy.js";
import { policyData } from "./design.js";
export interface Calldata extends IBuffer, IHintedObject {
    hint: Hint;
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
}
export declare class TransferCalldata implements Calldata {
    readonly hint: Hint;
    readonly sender: Address;
    readonly receiver: Address;
    readonly amount: Amount;
    constructor(sender: string, receiver: string, currency: string, amount: number);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
}
export declare class GovernanceCallData implements Calldata {
    readonly hint: Hint;
    readonly policy: Policy;
    constructor(p: policyData);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
}
