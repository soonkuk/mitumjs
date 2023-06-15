/// <reference types="node" />
import { HintedObject, IBuffer, IHintedObject, IString } from "./interface";
export declare abstract class Item implements IBuffer, IString, IHintedObject {
    private hint;
    constructor(hint: string);
    abstract toBuffer(): Buffer;
    abstract toString(): string;
    toHintedObject(): HintedObject;
}
