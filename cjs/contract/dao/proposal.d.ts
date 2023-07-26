/// <reference types="node" />
import { Address } from "../../account/address.js";
import { HintedObject, IBuffer, IHintedObject } from "../../types/interface.js";
import { Hint } from "../../types/property.js";
import { String } from "../../types/string.js";
import { Big, Uint8 } from "../../utils/math.js";
import { Calldata } from "./calldata.js";
export interface Proposal extends IBuffer, IHintedObject {
    hint: Hint;
    proposer: Address;
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
}
export declare class CryptoProposal implements Proposal {
    readonly hint: Hint;
    readonly proposer: Address;
    readonly startTime: Big;
    readonly calldata: Calldata;
    constructor(proposer: string, startTime: number, calldata: Calldata);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
}
export declare class BizProposal implements Proposal {
    readonly hint: Hint;
    readonly proposer: Address;
    readonly startTime: Big;
    readonly url: String;
    readonly hash: String;
    readonly options: Uint8;
    constructor(proposer: string, startTime: number, url: string, hash: string, options: number);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
}
