/// <reference types="node" />
import { ContractID, CurrencyID } from "../../types/property.js";
import { HintedObject } from "../../types/interface.js";
import { OperationFact } from "../../types/fact.js";
import { Address } from "../../account/address.js";
import { NFTItem } from "./item.js";
type ALLOW = "allow";
type CANCEL = "cancel";
export type DELEGATE = ALLOW | CANCEL;
export declare class DelegateItem extends NFTItem {
    operator: Address;
    mode: DELEGATE;
    constructor(contract: Address, collection: ContractID, operator: string, mode: DELEGATE, currency: CurrencyID);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
    toString(): string;
}
export declare class DelegateFact extends OperationFact<DelegateItem> {
    constructor(token: string, sender: string, items: DelegateItem[]);
    get operationHint(): string;
}
export {};
