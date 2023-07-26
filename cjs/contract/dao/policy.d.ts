/// <reference types="node" />
import { HintedObject, IBuffer, IHintedObject } from "../../types/interface.js";
import { Amount, CurrencyID, Hint } from "../../types/property.js";
import { Proposers } from "./proposer.js";
import { Big } from "../../utils/math.js";
import { Percent } from "./design.js";
export declare class Policy implements IBuffer, IHintedObject {
    readonly hint: Hint;
    readonly votingToken: CurrencyID;
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
    constructor(voteToken: string, threshold: number, fee: number, proposers: string[], waitingTime: number, registrationPeriod: number, preSnapPeriod: number, votingPeriod: number, postSnapPeriod: number, executionDelay: number, turnout: number, quorum: number);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
}
