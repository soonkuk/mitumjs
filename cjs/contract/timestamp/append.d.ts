/// <reference types="node" />
import { ContractID, CurrencyID } from "../../types/property.js";
import { FactJson } from "../../types/iFact.js";
import { String } from "../../types/string.js";
import { Fact } from "../../types/fact.js";
import { Big } from "../../utils/math.js";
import { Address } from "../../account/address.js";
export declare class AppendFact extends Fact {
    readonly sender: Address;
    readonly contract: Address;
    readonly serviceID: ContractID;
    readonly projectID: String;
    readonly requestTimeStamp: Big;
    readonly data: String;
    readonly currency: CurrencyID;
    constructor(token: string, sender: string, contract: string, serviceID: string, projectID: string, requestTimestamp: number, data: string, currency: string);
    toBuffer(): Buffer;
    toHintedObject(): FactJson;
    get operationHint(): string;
}
