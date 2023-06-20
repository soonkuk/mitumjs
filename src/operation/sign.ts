import { OperationType } from "../types/operation";
import { Fact } from "../types/fact";

import { Key } from "../account/publicKey";

// Optional: The option is node's address
export function signOperation(
  privateKey: string | Key,
  operation: OperationType<Fact>,
  option?: string
): any {
  operation.sign(privateKey, option);
  return JSON.stringify(operation.toHintedObject());
}
