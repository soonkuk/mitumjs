/// <reference types="node" />
import { Amount, ContractID, CurrencyID } from "../../types/property.js";
import { FactJson } from "../../types/iFact.js";
import { Fact } from "../../types/fact.js";
import { Address } from "../../account/address.js";
import { Big } from "../../utils/math.js";
import { Proposers } from "./proposer.js";
import { DaoOption } from "./design.js";
import { Percent } from "./design.js";
export declare class CreateDAOFact extends Fact {
    readonly sender: Address;
    readonly contract: Address;
    readonly serviceId: ContractID;
    readonly option: DaoOption;
    readonly voteToken: CurrencyID;
    readonly threshold: Amount;
    readonly fee: Amount;
    readonly proposers: Proposers;
    readonly waitingTime: Big;
    readonly registrationPeriod: Big;
    readonly preSnapPeriod: Big;
    readonly votingPeriod: Big;
    readonly postSnapPeriod: Big;
    readonly executionDelay: Big;
    readonly turnout: Percent;
    readonly quorum: Percent;
    readonly currency: CurrencyID;
    constructor(token: string, sender: string, contract: string, serviceId: string, option: string, voteToken: string, threshold: number, fee: number, proposers: string[], waitingTime: number, registrationPeriod: number, preSnapPeriod: number, votingPeriod: number, postSnapPeriod: number, executionDelay: number, turnout: number, quorum: number, currency: string);
    toBuffer(): Buffer;
    toHintedObject(): FactJson;
    get operationHint(): string;
}
