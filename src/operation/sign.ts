import { OperationType } from "../types/operation.js";
import { Fact } from "../types/fact.js";

import { Key } from "../account/publicKey.js";

// Optional: The option is node's address
export function signOperation(
  privateKey: string | Key,
  operation: OperationType<Fact>,
  option?: string
): any {
  operation.sign(privateKey, option);
  return JSON.stringify(operation.toHintedObject());
}
