/// <reference types="node" />
import { HintedObject } from "../types/interface";
import { KeyPairType } from "../types/address";
import { OperationFact } from "../types/fact";
import { Amount } from "../types/property";
import { CurrencyItem } from "../currency/currencyItem";
import { Address } from "../account/address";
import { Keys } from "../account/publicKey";
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
