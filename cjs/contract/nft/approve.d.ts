/// <reference types="node" />
import { Address } from "../../account/address.js";
import { NFTItem } from "./item.js";
import { Big } from "../../utils/math.js";
import { ContractID, CurrencyID } from "../../types/property.js";
import { HintedObject } from "../../types/interface.js";
import { OperationFact } from "../../types/fact.js";
export declare class ApproveItem extends NFTItem {
    readonly approved: Address;
    readonly nft: Big;
    constructor(contract: Address, collection: ContractID, approved: string, nft: string | number | Buffer | BigInt | Uint8Array, currency: CurrencyID);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
    toString(): string;
}
export declare class ApproveFact extends OperationFact<ApproveItem> {
    constructor(token: string, sender: string | Address, items: ApproveItem[]);
    get operationHint(): string;
}
