/// <reference types="node" />
import { HintedObject } from "../../types/interface.js";
import { OperationFact } from "../../types/fact.js";
import { Big } from "../../utils/math.js";
import { Address } from "../../account/address.js";
import { Partition } from "./partition.js";
import { STItem } from "./item.js";
export declare class TransferSecurityTokensPartitionItem extends STItem {
    readonly tokenholder: Address;
    readonly receiver: Address;
    readonly partition: Partition;
    readonly amount: Big;
    constructor(contract: string, serviceID: string, tokenholder: string, receiver: string, partition: string, amount: number, currency: string);
    toBuffer(): Buffer;
    toString(): string;
    toHintedObject(): HintedObject;
}
export declare class TransferSecurityTokensPartitionFact extends OperationFact<TransferSecurityTokensPartitionItem> {
    constructor(token: string, sender: string, items: TransferSecurityTokensPartitionItem[]);
    get operationHint(): string;
}
