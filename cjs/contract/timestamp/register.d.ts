/// <reference types="node" />
import { ContractID, CurrencyID } from "../../types/property.js";
import { FactJson } from "../../types/iFact.js";
import { Fact } from "../../types/fact.js";
import { Address } from "../../account/address.js";
export declare class ServiceRegisterFact extends Fact {
    readonly sender: Address;
    readonly contract: Address;
    readonly serviceID: ContractID;
    readonly currency: CurrencyID;
    constructor(token: string, sender: string, contract: string, serviceID: string, currency: string);
    toBuffer(): Buffer;
    toHintedObject(): FactJson;
    get operationHint(): string;
}
