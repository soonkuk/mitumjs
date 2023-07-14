import { AxiosResponse } from "axios";

import { OperationType } from "../../types/operation.js";
import { isIPAddress } from "../../utils/validation.js";
import { isAddress } from "../../utils/validation.js";
import { TimeStamp } from "../../utils/time.js";
import { Fact } from "../../types/fact.js";

import { AddControllersFact, AddControllersItem } from "./addController.js";
import { AddCustomersFact, AddCustomersItem } from "./addCustomer.js";

export class St {
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

  addController(
    sender: string,
    controller: string,
    currency: string
  ): OperationType<Fact> {
    const token = new TimeStamp().UTC();

    const item = new AddControllersItem(
      this._contractAddress,
      this._serviceID,
      controller,
      currency
    );
    const fact = new AddControllersFact(token, sender, [item]);

    return new OperationType(this._networkID, fact);
  }

  addCustomer(
    sender: string,
    customer: string,
    status: boolean,
    currency: string
  ): OperationType<Fact> {
    const token = new TimeStamp().UTC();

    const item = new AddCustomersItem(
      this._contractAddress,
      this._serviceID,
      customer,
      status,
      currency
    );
    const fact = new AddCustomersFact(token, sender, [item]);

    return new OperationType(this._networkID, fact);
  }
}
