import { OperationType } from "../types/operation.js";
import { Fact } from "../types/fact.js";

import { isIPAddress } from "../utils/validation.js";

import operationInfo from "./information.js";
import { signOperation } from "./sign.js";
import { sendOperation } from "./send.js";
import { AxiosResponse } from "axios";

export class Operation {
  private _node: string = "";

  constructor(provider?: string) {
    this._setNode(provider);
  }

  private _setNode(provider?: string) {
    if (isIPAddress(provider)) {
      this._node = provider as string;
    }
  }

  getAllOperations(): Promise<AxiosResponse> {
    return operationInfo.getAllOperationsInfo(this._node);
  }

  getOperation(facthash: string): Promise<AxiosResponse> {
    return operationInfo.getOperationInfo(this._node, facthash);
  }

  // Optional: The option is node's address
  sign(
    privatekey: string,
    operation: OperationType<Fact>,
    option?: string
  ): any {
    return signOperation(privatekey, operation, option);
  }

  send(
    signedOperation: any,
    headers?: { [i: string]: any }
  ): Promise<AxiosResponse> {
    return sendOperation(signedOperation, this._node, headers);
  }
}
