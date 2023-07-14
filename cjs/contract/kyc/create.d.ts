/// <reference types="node" />
import { ContractID, CurrencyID } from "../../types/property.js";
import { FactJson } from "../../types/iFact.js";
import { Fact } from "../../types/fact.js";
import { Address } from "../../account/address.js";
export declare class CreateKYCServiceFact extends Fact {
    readonly sender: Address;
    readonly contract: Address;
    readonly serviceId: ContractID;
    readonly controllers: Address[];
    readonly currency: CurrencyID;
    constructor(token: string, sender: string, contract: string, serviceId: string, controllers: string[], currency: string);
    toBuffer(): Buffer;
    toHintedObject(): FactJson;
    get operationHint(): string;
}
