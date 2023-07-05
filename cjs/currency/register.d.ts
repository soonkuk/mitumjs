/// <reference types="node" />
import { NodeFact } from "../types/fact.js";
import { FactJson } from "../types/iFact.js";
import { CurrencyDesign } from "./design.js";
export declare class CurrencyRegisterFact extends NodeFact {
    readonly design: CurrencyDesign;
    constructor(token: string, design: CurrencyDesign);
    toBuffer(): Buffer;
    toHintedObject(): FactJson;
    get operationHint(): string;
}
