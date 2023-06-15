import { HintedObject } from "../types/interface";
import { KeyPairType } from "../types/address";
import { Amount } from "../types/property";
import { Item } from "../types/item";
export declare abstract class CurrencyItem extends Item {
    readonly amounts: Amount[];
    readonly addressType: KeyPairType | "";
    constructor(hint: string, amounts: Amount[], addressType?: KeyPairType);
    toHintedObject(): HintedObject;
}
