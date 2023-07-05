/// <reference types="node" />
import { IBuffer, IString } from "./interface.js";
export declare class Boolean implements IBuffer, IString {
    private b;
    constructor(b: boolean);
    toBuffer(): Buffer;
    get v(): boolean;
}
