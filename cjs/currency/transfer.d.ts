/// <reference types="node" />
import { HintedObject } from "../types/interface.js";
import { OperationFact } from "../types/fact.js";
import { Amount } from "../types/property.js";
import { Address, ZeroAddress } from "../account/address.js";
import { CurrencyItem } from "./currencyItem.js";
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
