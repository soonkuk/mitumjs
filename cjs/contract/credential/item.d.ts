/// <reference types="node" />
import { Address } from "../../account/address.js";
import { ContractID, CurrencyID } from "../../types/property.js";
import { Item } from "../../types/item.js";
import { HintedObject } from "../../types/interface.js";
import { Big } from "../../utils/math.js";
import { String } from "../../types/string.js";
export declare abstract class CredentialsItem extends Item {
    readonly contract: Address;
    readonly credentialServiceID: ContractID;
    readonly holder: Address;
    readonly templateID: Big;
    readonly id: String;
    readonly currency: CurrencyID;
    constructor(hint: string, contract: string, credentialServiceID: string, holder: string, templateID: number, id: string, currency: string);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
}
