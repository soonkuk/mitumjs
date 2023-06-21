/// <reference types="node" />
import { HintedObject, IBuffer, IHintedObject } from "../types/interface.js";
import { Hint } from "./property.js";
import { Fact } from "./fact.js";
import { M2FactSign, M2NodeFactSign } from "./factSign.js";
import { Key } from "../account/publicKey.js";
export type FactSignType = M2FactSign | M2NodeFactSign;
export type SigType = "M2FactSign" | "M2NodeFactSign" | null;
export declare class OperationType<T extends Fact> implements IBuffer, IHintedObject {
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
    sign(privateKey: string | Key, option?: string): void;
    private signWithSigType;
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
}
