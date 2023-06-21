/// <reference types="node" />
import { HintedObject } from "../types/interface.js";
import { KeyPairType } from "../types/address.js";
import { OperationFact } from "../types/fact.js";
import { Amount } from "../types/property.js";
import { CurrencyItem } from "../currency/currencyItem.js";
import { Address } from "../account/address.js";
import { Keys } from "../account/publicKey.js";
export declare class CreateContractAccountsFact extends OperationFact<CreateContractAccountsItem> {
    constructor(token: string, sender: string | Address, items: CreateContractAccountsItem[]);
    get operationHint(): string;
}
export declare class CreateContractAccountsItem extends CurrencyItem {
    readonly keys: Keys;
    private addressSuffix;
    constructor(keys: Keys, amounts: Amount[], addressType?: KeyPairType);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
    toString(): string;
}
