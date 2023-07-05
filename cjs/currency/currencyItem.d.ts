import { HintedObject } from "../types/interface.js";
import { KeyPairType } from "../types/address.js";
import { Amount } from "../types/property.js";
import { Item } from "../types/item.js";
export declare abstract class CurrencyItem extends Item {
    readonly amounts: Amount[];
    readonly addressType: KeyPairType | "";
    constructor(hint: string, amounts: Amount[], addressType?: KeyPairType);
    toHintedObject(): HintedObject;
}
