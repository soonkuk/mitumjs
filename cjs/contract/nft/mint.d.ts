/// <reference types="node" />
import { HintedObject, IBuffer, IString } from "../../types/interface.js";
import { OperationFact } from "../../types/fact.js";
import { NFTSigners } from "./sign.js";
import { Creator } from "./creatorType.js";
import { NFTURI } from "./policy.js";
import { NFTItem } from "./item.js";
export declare function gererateCreator(originators: Creator[]): NFTSigners;
export declare class NFTHash implements IBuffer, IString {
    readonly s: string;
    constructor(s: string);
    toBuffer(): Buffer;
    toString(): string;
}
export declare class MintItem extends NFTItem {
    readonly hash: NFTHash;
    readonly uri: NFTURI;
    readonly creators: NFTSigners;
    constructor(contract: string, collection: string, hash: string, uri: string, creators: NFTSigners, currency: string);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
    toString(): string;
}
export declare class MintFact extends OperationFact<MintItem> {
    constructor(token: string, sender: string, items: MintItem[]);
    get operationHint(): string;
}
