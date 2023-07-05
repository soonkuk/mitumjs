/// <reference types="node" />
import { CurrencyItem } from "../currency/currencyItem.js";
import { HintedObject } from "../types/interface.js";
import { KeyPairType } from "../types/address.js";
import { OperationFact } from "../types/fact.js";
import { Amount } from "../types/property.js";
import { Address } from "./address.js";
import { Keys } from "./publicKey.js";
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
