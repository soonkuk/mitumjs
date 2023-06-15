/// <reference types="node" />
import { CurrencyID } from "../types/property";
import { FactJson } from "../types/iFact";
import { Fact } from "../types/fact";
import { Address } from "./address";
import { Keys } from "./publicKey";
export declare class KeyUpdaterFact extends Fact {
    readonly target: Address;
    readonly keys: Keys;
    readonly currency: CurrencyID;
    constructor(token: string, target: string | Address, keys: Keys, currency: string | CurrencyID);
    toBuffer(): Buffer;
    toHintedObject(): FactJson;
    get operationHint(): string;
}
