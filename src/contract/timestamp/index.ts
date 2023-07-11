import { AxiosResponse } from "axios";

import { OperationType } from "../../types/operation.js";
import { isIPAddress } from "../../utils/validation.js";
import { isAddress } from "../../utils/validation.js";
import { TimeStamp } from "../../utils/time.js";
import { Fact } from "../../types/fact.js";

import credentialInfo from "./information.js";

export class Credential {
  private _networkID: string = "";
  private _node: string = "";
  private _address: string = "";
  private _serviceID: string = "";

  constructor(networkID: string, provider?: string) {
    this._setNode(provider);
    this._setChain(networkID);
  }

  private _setNode(provider?: string) {
    if (isIPAddress(provider)) {
      this._node = provider as string;
    }
  }

  private _setChain(networkID: string) {
    this._networkID = networkID;
  }

  setContractAddress(contractAddress: string) {
    if (this._address !== contractAddress && isAddress(contractAddress)) {
      this._address = contractAddress;
      console.log("Contract address is changed : ", this._address);
    } else {
      console.error("This is invalid address type");
    }
  }

  setServiceId(serviceId: string) {
    if (this._serviceID !== serviceId) {
      this._serviceID = serviceId;
      console.log("Credential ID is changed : ", this._serviceID);
    } else {
      console.error("This is invalid credential ID type");
    }
  }

  getContractAddress(): string {
    return this._address.toString();
  }

  getServiceId(): string {
    return this._serviceID.toString();
  }

  getServiceInfo(?:serviceID): Promise<AxiosResponse> {

  }
}
