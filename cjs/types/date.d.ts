/// <reference types="node" />
import { IBuffer, IString } from "./interface.js";
export declare class Date implements IBuffer, IString {
    private d;
    constructor(d: string);
    toBuffer(): Buffer;
    get v(): string;
}
