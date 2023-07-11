/// <reference types="node" />
import { Address } from "../../account/address.js";
import { NFTItem } from "./item.js";
import { Big } from "../../utils/math.js";
import { HintedObject } from "../../types/interface.js";
import { OperationFact } from "../../types/fact.js";
export declare class ApproveItem extends NFTItem {
    readonly approved: Address;
    readonly tokenId: Big;
    constructor(contract: string, collection: string, approved: string, tokenId: string | number | Buffer | BigInt | Uint8Array, currency: string);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
    toString(): string;
}
export declare class ApproveFact extends OperationFact<ApproveItem> {
    constructor(token: string, sender: string | Address, items: ApproveItem[]);
    get operationHint(): string;
}
