/// <reference types="node" />
import { CurrencyID } from "../types/property";
import { FactJson } from "../types/iFact";
import { NodeFact } from "../types/fact";
import { CurrencyPolicy } from "./design";
export declare class CurrencyPolicyUpdaterFact extends NodeFact {
    readonly currency: CurrencyID;
    readonly policy: CurrencyPolicy;
    constructor(token: string, currency: string | CurrencyID, policy: CurrencyPolicy);
    toBuffer(): Buffer;
    toHintedObject(): FactJson;
    get operationHint(): string;
}
