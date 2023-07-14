/// <reference types="node" />
import { HintedObject } from "../../types/interface.js";
import { OperationFact } from "../../types/fact.js";
import { Big } from "../../utils/math.js";
import { Address } from "../../account/address.js";
import { Partition } from "./partition.js";
import { STItem } from "./item.js";
export declare class CreateSecurityTokensItem extends STItem {
    readonly granularity: Big;
    readonly defaultPartition: Partition;
    readonly controllers: Address[];
    constructor(contract: string, serviceID: string, granularity: number, defaultPartition: string, controllers: string[], currency: string);
    toBuffer(): Buffer;
    toString(): string;
    toHintedObject(): HintedObject;
}
export declare class CreateSecurityTokensFact extends OperationFact<CreateSecurityTokensItem> {
    constructor(token: string, sender: string, items: CreateSecurityTokensItem[]);
    get operationHint(): string;
}
