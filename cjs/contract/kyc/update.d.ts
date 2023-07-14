/// <reference types="node" />
import { HintedObject } from "../../types/interface.js";
import { OperationFact } from "../../types/fact.js";
import { Boolean } from "../../types/boolean.js";
import { Address } from "../../account/address.js";
import { KYCItem } from "./item.js";
export declare class UpdateCustomersItem extends KYCItem {
    readonly customer: Address;
    readonly status: Boolean;
    constructor(contract: string, serviceID: string, customer: string, status: boolean, currency: string);
    toBuffer(): Buffer;
    toString(): string;
    toHintedObject(): HintedObject;
}
export declare class UpdateCustomersFact extends OperationFact<UpdateCustomersItem> {
    constructor(token: string, sender: string, items: UpdateCustomersItem[]);
    get operationHint(): string;
}
