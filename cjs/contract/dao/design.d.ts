/// <reference types="node" />
import { IBuffer, IString } from "../../types/interface.js";
import { Uint8 } from "../../utils/math.js";
export declare const CRYPTO = "crypto";
export declare const BIZ = "biz";
export type DaoType = typeof CRYPTO | typeof BIZ;
export declare class DaoOption implements IBuffer, IString {
    private o;
    constructor(o: string);
    toBuffer(): Buffer;
    toString(): string;
}
export type policyData = {
    voteToken: string;
    threshold: number;
    fee: number;
    proposers: string[];
    waitingTime: number;
    registrationPeriod: number;
    preSnapPeriod: number;
    votingPeriod: number;
    postSnapPeriod: number;
    executionDelay: number;
    turnout: number;
    quorum: number;
};
export type daoData = policyData & {
    serviceId: string;
    option: string;
};
export declare class Percent implements IBuffer, IString {
    readonly p: Uint8;
    constructor(p: number);
    toBuffer(): Buffer;
    toString(): string;
    get v(): number;
}
