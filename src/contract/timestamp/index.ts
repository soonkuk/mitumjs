import { AxiosResponse } from "axios";

import { OperationType } from "../../types/operation.js";
import { isIPAddress } from "../../utils/validation.js";
import { isAddress } from "../../utils/validation.js";
import { TimeStamp as time } from "../../utils/time.js";
import { Fact } from "../../types/fact.js";

import timestampInfo from "./information.js";
import { AppendFact } from "./append.js";
import { ServiceRegisterFact } from "./register.js";

export class Timestamp {
  private _networkID: string = "";
  private _node: string = "";
  private _contractAddress: string = "";
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
    if (
      this._contractAddress !== contractAddress &&
      isAddress(contractAddress)
    ) {
      this._contractAddress = contractAddress;
      console.log("Contract address is changed : ", this._contractAddress);
    } else {
      console.error("This is invalid address type");
    }
  }

  setServiceId(serviceId: string) {
    if (this._serviceID !== serviceId) {
      this._serviceID = serviceId;
      console.log("Service ID is changed : ", this._serviceID);
    }
  }

  getContractAddress(): string {
    return this._contractAddress.toString();
  }

  getServiceId(): string {
    return this._serviceID.toString();
  }

  async getServiceInfo(serviceID?: string): Promise<AxiosResponse | null> {
    let sid = this._serviceID;

    if (serviceID !== undefined) {
      sid = serviceID;
    }

    const res = await timestampInfo.getServiceInfo(
      this._node,
      this._contractAddress,
      sid
    );

    if (!res) {
      return null;
    }

    return res.data;
  }

  async getTimestampInfo(
    serviceID: string,
    projectID: string,
    tID: number
  ): Promise<AxiosResponse | null> {
    const res = await timestampInfo.getTimestampInfo(
      this._node,
      this._contractAddress,
      serviceID,
      projectID,
      tID
    );

    if (!res) {
      return null;
    }

    return res.data;
  }

  append(
    sender: string,
    projectID: string,
    requestTime: number,
    data: string,
    currencyID: string
  ): OperationType<Fact> {
    const token = new time().UTC();

    const fact = new AppendFact(
      token,
      sender,
      this._contractAddress,
      this._serviceID,
      projectID,
      requestTime,
      data,
      currencyID
    );

    return new OperationType(this._networkID, fact);
  }

  createTimestampService(
    sender: string,
    serviceId: string,
    currencyID: string
  ): OperationType<Fact> {
    const token = new time().UTC();

    const fact = new ServiceRegisterFact(
      token,
      sender,
      this._contractAddress,
      serviceId,
      currencyID
    );

    this.setServiceId(serviceId);

    return new OperationType(this._networkID, fact);
  }
}
