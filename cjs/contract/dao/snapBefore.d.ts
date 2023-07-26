/// <reference types="node" />
import { ContractID, CurrencyID } from "../../types/property.js";
import { Address } from "../../account/address.js";
import { FactJson } from "../../types/iFact.js";
import { String } from "../../types/string.js";
import { Fact } from "../../types/fact.js";
export declare class PreSnapFact extends Fact {
    readonly sender: Address;
    readonly contract: Address;
    readonly serviceId: ContractID;
    readonly proposalId: String;
    readonly currency: CurrencyID;
    constructor(token: string, sender: string, contract: string, serviceId: string, proposalId: string, currency: string);
    toBuffer(): Buffer;
    toHintedObject(): FactJson;
    get operationHint(): string;
}
