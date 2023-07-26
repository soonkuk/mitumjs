/// <reference types="node" />
import { ContractID, CurrencyID } from "../../types/property.js";
import { FactJson } from "../../types/iFact.js";
import { Fact } from "../../types/fact.js";
import { Address } from "../../account/address.js";
import { Big } from "../../utils/math.js";
import { String } from "../../types/string.js";
import { Proposal } from "./proposal.js";
export declare class ProposeFact extends Fact {
    readonly sender: Address;
    readonly contract: Address;
    readonly serviceId: ContractID;
    readonly proposalId: String;
    readonly startTime: Big;
    readonly proposal: Proposal;
    readonly currency: CurrencyID;
    constructor(token: string, sender: string, contract: string, serviceId: string, proposalId: string, startTime: number, proposal: Proposal, currency: string);
    toBuffer(): Buffer;
    toHintedObject(): FactJson;
    get operationHint(): string;
}
