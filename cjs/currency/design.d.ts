/// <reference types="node" />
import { HintedObject, IBuffer, IHintedObject } from "../types/interface";
import { Amount } from "../types/property";
import { Big, Float } from "../utils/math";
import { Address } from "../account/address";
type nilFee = "none";
type fixedFee = "fixed";
type ratioFee = "ratio";
type feeType = nilFee | fixedFee | ratioFee;
export type inputData = {
    currencyID: string;
    genesisAddress?: string;
    totalSupply?: number;
    minBalance: number;
    feeType: feeType;
    feeReceiver?: string;
    fee?: number;
    minFee?: number;
    maxFee?: number;
};
export declare class CurrencyDesign implements IBuffer, IHintedObject {
    private static hint;
    readonly amount: Amount;
    readonly policy: CurrencyPolicy;
    readonly genesisAccount: Address;
    readonly aggregate: Big;
    constructor(amount: Amount, genesisAccount: string | Address, policy: CurrencyPolicy);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
}
export declare class CurrencyPolicy implements IBuffer, IHintedObject {
    private static hint;
    readonly newAccountMinBalance: Big;
    readonly feeer: Feeer;
    constructor(newAccountMinBalance: string | number | Big, feeer: Feeer);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
}
declare abstract class Feeer implements IBuffer, IHintedObject {
    private hint;
    readonly exchangeMinAmount?: Big;
    constructor(hint: string, exchangeMinAmount?: string | number | Big);
    abstract toBuffer(): Buffer;
    toHintedObject(): HintedObject;
}
export declare class NilFeeer extends Feeer {
    constructor();
    toBuffer(): Buffer;
}
export declare class FixedFeeer extends Feeer {
    readonly receiver: Address;
    readonly amount: Big;
    constructor(receiver: string | Address, amount: string | number | Big);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
}
export declare class RatioFeeer extends Feeer {
    readonly receiver: Address;
    readonly ratio: Float;
    readonly min: Big;
    readonly max: Big;
    constructor(receiver: string | Address, ratio: number, min: string | number | Big, max: string | number | Big);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
}
export {};
