/// <reference types="node" />
import { ContractID, CurrencyID } from "../../types/property";
import { FactJson } from "../../types/iFact";
import { Fact } from "../../types/fact";
import { Address } from "../../account/address";
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
