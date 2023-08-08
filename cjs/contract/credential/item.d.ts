/// <reference types="node" />
import { Address } from "../../account/address.js";
import { CurrencyID } from "../../types/property.js";
import { Item } from "../../types/item.js";
import { HintedObject } from "../../types/interface.js";
import { String } from "../../types/string.js";
import { ServiceID } from "../../types/serviceId.js";
export declare abstract class CredentialsItem extends Item {
    readonly contract: Address;
    readonly credentialServiceID: ServiceID;
    readonly holder: Address;
    readonly templateID: String;
    readonly id: String;
    readonly currency: CurrencyID;
    constructor(hint: string, contract: string, credentialServiceID: string, holder: string, templateID: string, id: string, currency: string);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
    toString(): string;
}
