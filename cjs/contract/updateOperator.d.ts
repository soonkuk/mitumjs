/// <reference types="node" />
import { Fact } from "../types/fact.js";
import { CurrencyID } from "../types/property.js";
import { Address } from "../account/address.js";
import { FactJson } from "../types/iFact";
export declare class UpdateOperatorFact extends Fact {
    readonly sender: Address;
    readonly contract: Address;
    readonly operators: Address[];
    readonly currency: CurrencyID;
    constructor(token: string, sender: string | Address, contract: string | Address, operators: string[], currency: string | CurrencyID);
    toBuffer(): Buffer;
    toHintedObject(): FactJson;
    get operationHint(): string;
}
