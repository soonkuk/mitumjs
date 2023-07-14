/// <reference types="node" />
import { HintedObject } from "../../types/interface.js";
import { OperationFact } from "../../types/fact.js";
import { Boolean } from "../../types/boolean.js";
import { Address } from "../../account/address.js";
import { KYCItem } from "./item.js";
export declare class AddCustomersItem extends KYCItem {
    readonly customer: Address;
    readonly status: Boolean;
    constructor(contract: string, serviceID: string, customer: string, status: boolean, currency: string);
    toBuffer(): Buffer;
    toString(): string;
    toHintedObject(): HintedObject;
}
export declare class AddCustomersFact extends OperationFact<AddCustomersItem> {
    constructor(token: string, sender: string, items: AddCustomersItem[]);
    get operationHint(): string;
}
