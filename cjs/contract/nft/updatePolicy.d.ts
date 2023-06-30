/// <reference types="node" />
import { Address } from "../../account/address.js";
import { ContractID, CurrencyID } from "../../types/property.js";
import { Fact } from "../../types/fact.js";
import { CollectionName, PaymentParam, NFTURI } from "./policy.js";
export declare class CollectionPolicyUpdaterFact extends Fact {
    readonly sender: Address;
    readonly contract: Address;
    readonly name: CollectionName;
    readonly royalty: PaymentParam;
    readonly uri: NFTURI;
    readonly collection: ContractID;
    readonly whites: Address[];
    readonly currency: CurrencyID;
    constructor(token: string, sender: string, contract: string, collection: string, name: string, royalty: string | number | Buffer | BigInt | Uint8Array, uri: string, whites: string[], currency: string);
    toBuffer(): Buffer;
    toHintedObject(): {
        hash: string;
        token: string;
        sender: string;
        contract: string;
        collection: string;
        name: string;
        royalty: number;
        uri: string;
        whites: string[];
        currency: string;
        _hint: string;
    };
    get operationHint(): string;
}
