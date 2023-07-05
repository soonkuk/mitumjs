import { OperationType } from "../types/operation.js";
import { Fact } from "../types/fact.js";
import { Key } from "../account/publicKey.js";
export declare function signOperation(privateKey: string | Key, operation: OperationType<Fact>, option?: string): any;
