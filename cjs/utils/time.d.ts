/// <reference types="node" />
import { IBuffer, IString } from "../types/interface";
export declare class TimeStamp implements IBuffer, IString {
    private t;
    constructor(t?: string | number | Date);
    static from(t: string | number | Date | TimeStamp): TimeStamp;
    toBuffer(): Buffer;
    toString(): string;
    ISO(): string;
    UTC(): string;
}
export declare class FullTimeStamp extends TimeStamp {
    private r;
    constructor(s: string);
    static from(t: string | FullTimeStamp): FullTimeStamp;
    toBuffer(option?: "super"): Buffer;
    ISO(): string;
    UTC(): string;
}
