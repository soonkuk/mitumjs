/// <reference types="node" />
import { CurrencyID } from "../types/property.js";
import { FactJson } from "../types/iFact.js";
import { Fact } from "../types/fact.js";
import { Address } from "./address.js";
import { EtherKeys, Keys } from "./publicKey.js";
export declare class KeyUpdaterFact extends Fact {
    readonly target: Address;
    readonly keys: Keys | EtherKeys;
    readonly currency: CurrencyID;
    constructor(token: string, target: string | Address, keys: Keys | EtherKeys, currency: string | CurrencyID);
    toBuffer(): Buffer;
    toHintedObject(): FactJson;
    get operationHint(): string;
}
