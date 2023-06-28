/// <reference types="node" />
import { Address } from "../../account/address.js";
import { ContractID, CurrencyID } from "../../types/property.js";
import { Item } from "../../types/item.js";
import { HintedObject } from "../../types/interface.js";
export declare abstract class NFTItem extends Item {
    readonly contract: Address;
    readonly collection: ContractID;
    readonly currency: CurrencyID;
    constructor(hint: string, contract: Address, collection: ContractID, currency: CurrencyID);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
}
