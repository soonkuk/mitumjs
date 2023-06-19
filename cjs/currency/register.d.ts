/// <reference types="node" />
import { NodeFact } from "../types/fact";
import { FactJson } from "../types/iFact";
import { CurrencyDesign } from "./design";
export declare class CurrencyRegisterFact extends NodeFact {
    readonly design: CurrencyDesign;
    constructor(token: string, design: CurrencyDesign);
    toBuffer(): Buffer;
    toHintedObject(): FactJson;
    get operationHint(): string;
}
