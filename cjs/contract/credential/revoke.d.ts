/// <reference types="node" />
import { OperationFact } from "../../types/fact.js";
import { CredentialsItem } from "./item.js";
import { HintedObject } from "../../types/interface.js";
export declare abstract class RevokeCredentialsItem extends CredentialsItem {
    constructor(contract: string, credentialServiceID: string, holder: string, templateID: number, id: string, currency: string);
    toBuffer(): Buffer;
    toHintedObject(): HintedObject;
}
export declare class AssignCredentialsFact extends OperationFact<RevokeCredentialsItem> {
    constructor(token: string, sender: string, items: RevokeCredentialsItem[]);
    get operationHint(): string;
}
