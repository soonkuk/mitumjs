/// <reference types="node" />
import { Address } from "../../account/address.js";
import { ContractID, CurrencyID } from "../../types/property.js";
import { Fact } from "../../types/fact.js";
import { CollectionName, PaymentParam, NFTURI } from "./policy.js";
import { FactJson } from "../../types/iFact.js";
export declare class CollectionPolicyUpdaterFact extends Fact {
    readonly sender: Address;
    readonly contract: Address;
    readonly collection: ContractID;
    readonly name: CollectionName;
    readonly royalty: PaymentParam;
    readonly uri: NFTURI;
    readonly whitelist: Address[];
    readonly currency: CurrencyID;
    constructor(token: string, sender: string, contract: string, collection: string, name: string, royalty: string | number | Buffer | BigInt | Uint8Array, uri: string, whitelist: string[], currency: string);
    toBuffer(): Buffer;
    toHintedObject(): FactJson;
    get operationHint(): string;
}
