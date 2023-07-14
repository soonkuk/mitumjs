/// <reference types="node" />
import { ContractID, CurrencyID } from "../../types/property.js";
import { FactJson } from "../../types/iFact.js";
import { Fact } from "../../types/fact.js";
import { String } from "../../types/string.js";
import { Address } from "../../account/address.js";
export declare class SetDocumentFact extends Fact {
    readonly sender: Address;
    readonly contract: Address;
    readonly serviceId: ContractID;
    readonly title: String;
    readonly uri: String;
    readonly documentHash: String;
    readonly currency: CurrencyID;
    constructor(token: string, sender: string, contract: string, serviceId: string, title: string, uri: string, documentHash: string, currency: string);
    toBuffer(): Buffer;
    toHintedObject(): FactJson;
    get operationHint(): string;
}
