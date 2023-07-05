/// <reference types="node" />
import { CurrencyID } from "../types/property.js";
import { FactJson } from "../types/iFact.js";
import { NodeFact } from "../types/fact.js";
import { CurrencyPolicy } from "./design.js";
export declare class CurrencyPolicyUpdaterFact extends NodeFact {
    readonly currency: CurrencyID;
    readonly policy: CurrencyPolicy;
    constructor(token: string, currency: string | CurrencyID, policy: CurrencyPolicy);
    toBuffer(): Buffer;
    toHintedObject(): FactJson;
    get operationHint(): string;
}
