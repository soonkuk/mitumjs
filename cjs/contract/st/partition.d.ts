/// <reference types="node" />
import { IBuffer, IString } from "../../types/interface.js";
export declare class Partition implements IBuffer, IString {
    private p;
    constructor(p: string);
    toBuffer(): Buffer;
    toString(): string;
}
