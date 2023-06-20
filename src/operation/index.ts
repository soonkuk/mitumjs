import { OperationType } from "../types/operation";
import { Fact } from "../types/fact";

import { isIPAddress } from "../utils/validation";

import operationInfo from "./information";
import { signOperation } from "./sign";
import { sendOperation } from "./send";
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

  getAll(): Promise<AxiosResponse> {
    return operationInfo.getAllOperationsInfo(this._node);
  }

  get(facthash: string): Promise<AxiosResponse> {
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

  // NOTE: The send function is an asynchronous function. (return value: Promise Obj)
  send(
    signedOperation: any,
    headers?: { [i: string]: any }
  ): Promise<AxiosResponse> {
    return sendOperation(signedOperation, this._node, headers);
  }
}
