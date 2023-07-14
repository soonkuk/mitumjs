/// <reference types="node" />
import { HintedObject } from "../../types/interface.js";
import { OperationFact } from "../../types/fact.js";
import { Big } from "../../utils/math.js";
import { Address } from "../../account/address.js";
import { Partition } from "./partition.js";
import { STItem } from "./item.js";
export declare class RedeemTokensItem extends STItem {
    readonly tokenHolder: Address;
    readonly amount: Big;
    readonly partition: Partition;
    constructor(contract: string, serviceID: string, tokenHolder: string, amount: number, partition: string, currency: string);
    toBuffer(): Buffer;
    toString(): string;
    toHintedObject(): HintedObject;
}
export declare class RedeemTokensFact extends OperationFact<RedeemTokensItem> {
    constructor(token: string, sender: string, items: RedeemTokensItem[]);
    get operationHint(): string;
}
