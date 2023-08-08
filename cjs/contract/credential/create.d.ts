/// <reference types="node" />
import { CurrencyID } from "../../types/property.js";
import { FactJson } from "../../types/iFact.js";
import { ServiceID } from "../../types/serviceId.js";
import { Fact } from "../../types/fact.js";
import { Address } from "../../account/address.js";
export declare class CreateCredentialServiceFact extends Fact {
    readonly sender: Address;
    readonly contract: Address;
    readonly credentialServiceID: ServiceID;
    readonly currency: CurrencyID;
    constructor(token: string, sender: string, contract: string, credentialServiceID: string, currency: string);
    toBuffer(): Buffer;
    toHintedObject(): FactJson;
    get operationHint(): string;
}
