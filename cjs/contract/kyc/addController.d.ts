/// <reference types="node" />
import { HintedObject } from "../../types/interface.js";
import { OperationFact } from "../../types/fact.js";
import { Address } from "../../account/address.js";
import { KYCItem } from "./item.js";
export declare class AddControllersItem extends KYCItem {
    readonly controller: Address;
    constructor(contract: string, serviceID: string, controller: string, currency: string);
    toBuffer(): Buffer;
    toString(): string;
    toHintedObject(): HintedObject;
}
export declare class AddControllersFact extends OperationFact<AddControllersItem> {
    constructor(token: string, sender: string, items: AddControllersItem[]);
    get operationHint(): string;
}
