/// <reference types="node" />
import { HintedObject, IBuffer, IHintedObject, IString } from "./interface";
import { Big } from "../utils/math";
declare class Hint implements IString {
    private s;
    constructor(s: string);
    toString(): string;
}
declare class Token implements IBuffer, IString {
    private s;
    constructor(s: string);
    static from(s: string | Token): Token;
    toBuffer(): Buffer;
    toString(): string;
}
declare abstract class ID implements IBuffer, IString {
    private s;
    constructor(s: string);
    equal(id: ID): boolean;
    toBuffer(): Buffer;
    toString(): string;
}
declare class CurrencyID extends ID {
    constructor(s: string);
    static from(s: string | CurrencyID): CurrencyID;
}
declare class ContractID extends ID {
    constructor(s: string);
    static from(s: string | ContractID): ContractID;
}
declare class Amount implements IBuffer, IHintedObject {
    private static hint;
    readonly currency: CurrencyID;
    readonly big: Big;
    constructor(currency: string | CurrencyID, big: string | number | Big);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
}
export { Hint, Token, ID, CurrencyID, ContractID, Amount };
