/// <reference types="node" />
import { IHintedObject, IBuffer, HintedObject } from "../../types/interface.js";
import { Hint } from "../../types/property.js";
import { OperationFact } from "../../types/fact.js";
import { Big } from "../../utils/math.js";
import { Address } from "../../account/address.js";
import { NFTItem } from "./item.js";
export declare class NFTSigner implements IHintedObject, IBuffer {
    readonly hint: Hint;
    readonly account: Address;
    readonly share: Big;
    readonly signed: boolean;
    constructor(account: string, share: string | number | Buffer | BigInt | Uint8Array);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
}
export declare class NFTSigners implements IHintedObject, IBuffer {
    readonly hint: Hint;
    readonly total: Big;
    readonly signers: NFTSigner[];
    constructor(total: string | number | Buffer | BigInt | Uint8Array, signers: NFTSigner[]);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
}
export declare class NFTSignItem extends NFTItem {
    readonly nft: Big;
    constructor(contract: string, collection: string, nft: string | number | Buffer | BigInt | Uint8Array, currency: string);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
    toString(): string;
}
export declare class NFTSignFact extends OperationFact<NFTSignItem> {
    constructor(token: string, sender: string, items: NFTSignItem[]);
    get operationHint(): string;
}
