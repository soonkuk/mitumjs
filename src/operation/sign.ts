import { OperationType } from "../types/operation";
import { Fact } from "../types/fact";

import { Key } from "../account/publicKey";

// Optional: The option is node's address
export function signOperation(
  privateKey: string | Key,
  operation: OperationType<Fact>,
  option?: string
): OperationType<Fact> {
  operation.sign(privateKey, option);
  return operation;
}
