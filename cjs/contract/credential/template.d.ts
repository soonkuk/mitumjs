/// <reference types="node" />
import { ContractID, CurrencyID } from "../../types/property.js";
import { Boolean } from "../../types/boolean.js";
import { TimeStamp } from "../../utils/time.js";
import { FactJson } from "../../types/iFact.js";
import { String } from "../../types/string.js";
import { Fact } from "../../types/fact.js";
import { Big } from "../../utils/math.js";
import { Address } from "../../account/address.js";
export declare class AddTemplateFact extends Fact {
    readonly sender: Address;
    readonly contract: Address;
    readonly credentialServiceID: ContractID;
    readonly templateID: Big;
    readonly templateName: String;
    readonly serviceDate: TimeStamp;
    readonly expirationDate: TimeStamp;
    readonly templateShare: Boolean;
    readonly multiAudit: Boolean;
    readonly displayName: String;
    readonly subjectKey: String;
    readonly description: String;
    readonly creator: Address;
    readonly currency: CurrencyID;
    constructor(token: string, sender: string, contract: string, credentialServiceID: string, templateID: number, templateName: string, serviceDate: string, expirationDate: string, templateShare: boolean, multiAudit: boolean, displayName: string, subjectKey: string, description: string, creator: string, currency: string);
    toBuffer(): Buffer;
    toHintedObject(): FactJson;
    get operationHint(): string;
}
