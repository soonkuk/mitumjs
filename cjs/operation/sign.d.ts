import { OperationType } from "../types/operation";
import { Fact } from "../types/fact";
import { Key } from "../account/publicKey";
export declare function signOperation(privateKey: string | Key, operation: OperationType<Fact>, option?: string): OperationType<Fact>;
