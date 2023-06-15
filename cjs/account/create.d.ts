/// <reference types="node" />
import { CurrencyItem } from "../currency/currencyItem";
import { HintedObject } from "../types/interface";
import { KeyPairType } from "../types/address";
import { OperationFact } from "../types/fact";
import { Amount } from "../types/property";
import { Address } from "./address";
import { Keys } from "./publicKey";
export declare class CreateAccountsFact extends OperationFact<CreateAccountsItem> {
    constructor(token: string, sender: string | Address, items: CreateAccountsItem[]);
    get operationHint(): string;
}
export declare class CreateAccountsItem extends CurrencyItem {
    readonly keys: Keys;
    private addressSuffix;
    constructor(keys: Keys, amounts: Amount[], addressType?: KeyPairType);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
    toString(): string;
}
