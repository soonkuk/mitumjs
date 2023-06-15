/// <reference types="node" />
import { HintedObject, IBuffer, IHintedObject } from "../types/interface";
import { M2FactSign, M2NodeFactSign } from "./factSign";
import { Hint } from "./property";
import { Fact } from "./fact";
type FactSignType = M2FactSign | M2NodeFactSign;
type SigType = "M2FactSign" | "M2NodeFactSign" | null;
export declare class Operation<T extends Fact> implements IBuffer, IHintedObject {
    readonly id: string;
    readonly hint: Hint;
    readonly memo: string;
    readonly fact: T;
    private _factSigns;
    private _hash;
    constructor(fact: T, memo?: string);
    setFactSigns(factSigns: FactSignType[]): void;
    get factSigns(): FactSignType[];
    get hash(): Buffer;
    get factSignType(): SigType;
    private getSigType;
    hashing(force?: "force"): Buffer;
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
}
export {};
