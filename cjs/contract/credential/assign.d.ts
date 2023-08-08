/// <reference types="node" />
import { OperationFact } from "../../types/fact.js";
import { CredentialsItem } from "./item.js";
import { Big } from "../../utils/math.js";
import { String } from "../../types/string.js";
import { HintedObject } from "../../types/interface.js";
export declare class AssignCredentialsItem extends CredentialsItem {
    readonly value: String;
    readonly validfrom: Big;
    readonly validuntil: Big;
    readonly did: String;
    constructor(contract: string, credentialServiceID: string, holder: string, templateID: string, id: string, value: string, validfrom: number, validuntil: number, did: string, currency: string);
    toString(): string;
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
}
export declare class AssignCredentialsFact extends OperationFact<AssignCredentialsItem> {
    constructor(token: string, sender: string, items: AssignCredentialsItem[]);
    get operationHint(): string;
}
