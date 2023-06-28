/// <reference types="node" />
import { Address } from "../../account/address.js";
import { OperationFact } from "../../types/fact.js";
import { Big } from "../../utils/math.js";
import { NFTItem } from "./item.js";
import { ContractID, CurrencyID } from "../../types/property.js";
import { HintedObject } from "../../types/interface.js";
export declare class NFTTransferItem extends NFTItem {
    readonly receiver: Address;
    readonly nft: Big;
    constructor(contract: Address, collection: ContractID, receiver: string, nft: string | number | Buffer | BigInt | Uint8Array, currency: CurrencyID);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
    toString(): string;
}
export declare class NFTTransferFact extends OperationFact<NFTTransferItem> {
    constructor(token: string, sender: string, items: NFTTransferItem[]);
    get operationHint(): string;
}
