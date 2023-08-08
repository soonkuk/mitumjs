/// <reference types="node" />
import { IBuffer, IString } from "./interface.js";
export declare class ServiceID implements IBuffer, IString {
    private s;
    constructor(s: string);
    toBuffer(): Buffer;
    toString(): string;
}
