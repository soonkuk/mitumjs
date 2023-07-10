/// <reference types="node" />
import { ContractID, CurrencyID } from "../../types/property.js";
import { FactJson } from "../../types/iFact.js";
import { Fact } from "../../types/fact.js";
import { CollectionName, PaymentParam, NFTURI } from "./policy.js";
import { Address } from "../../account/address.js";
export type collectionData = {
    name: string;
    symbol: string;
    uri: string;
    royalty: string | number | Buffer | BigInt | Uint8Array;
    whiteLists: string[];
};
export declare class CollectionRegisterFact extends Fact {
    readonly sender: Address;
    readonly contract: Address;
    readonly collection: ContractID;
    readonly name: CollectionName;
    readonly royalty: PaymentParam;
    readonly uri: NFTURI;
    readonly currency: CurrencyID;
    readonly whites: Address[];
    constructor(token: string, sender: string, contract: string, collection: string, name: string, royalty: string | number | Buffer | BigInt | Uint8Array, uri: string, whites: string[], currency: string);
    toBuffer(): Buffer;
    toHintedObject(): FactJson;
    get operationHint(): string;
}
