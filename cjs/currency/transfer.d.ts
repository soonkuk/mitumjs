/// <reference types="node" />
import { HintedObject } from "../types/interface";
import { OperationFact } from "../types/fact";
import { Amount } from "../types/property";
import { Address, ZeroAddress } from "../account/address";
import { CurrencyItem } from "./currencyItem";
export declare class TransfersItem extends CurrencyItem {
    readonly receiver: Address | ZeroAddress;
    constructor(receiver: string | Address | ZeroAddress, amounts: Amount[]);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
    toString(): string;
}
export declare class TransfersFact extends OperationFact<TransfersItem> {
    constructor(token: string, sender: string | Address, items: TransfersItem[]);
    get operationHint(): string;
}
