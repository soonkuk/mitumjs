/// <reference types="node" />
import { ContractID, CurrencyID } from "../../types/property";
import { FactJson } from "../../types/iFact";
import { String } from "../../types/string";
import { Fact } from "../../types/fact";
import { Big } from "../../utils/math";
import { Address } from "../../account/address";
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
