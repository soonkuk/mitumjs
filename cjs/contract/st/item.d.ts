/// <reference types="node" />
import { Address } from "../../account/address.js";
import { ContractID, CurrencyID } from "../../types/property.js";
import { Item } from "../../types/item.js";
import { HintedObject } from "../../types/interface.js";
export declare abstract class STItem extends Item {
    readonly contract: Address;
    readonly service: ContractID;
    readonly currency: CurrencyID;
    constructor(hint: string, contract: string, serviceId: string, currency: string);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
}
