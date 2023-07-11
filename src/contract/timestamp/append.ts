import { ContractID, CurrencyID } from "../../types/property.js";
import { FactJson } from "../../types/iFact.js";
import { String } from "../../types/string.js";
import { Fact } from "../../types/fact.js";
import { Big } from "../../utils/math.js";

import { Address } from "../../account/address.js";

const AppendFactHint = "mitum-timestamp-append-operation-fact";
const AppendHint = "mitum-timestamp-append-operation";

export class AppendFact extends Fact {
  readonly sender: Address;
  readonly contract: Address;
  readonly serviceID: ContractID;
  readonly projectID: String;
  readonly requestTimeStamp: Big;
  readonly data: String;
  readonly currency: CurrencyID;

  constructor(
    token: string,
    sender: string,
    contract: string,
    serviceID: string,
    projectID: string,
    requestTimestamp: number,
    data: string,
    currency: string
  ) {
    super(AppendFactHint, token);

    this.sender = new Address(sender);
    this.contract = new Address(contract);
    this.serviceID = new ContractID(serviceID);
    this.projectID = new String(projectID);
    this.requestTimeStamp = new Big(requestTimestamp);
    this.data = new String(data);
    this.currency = new CurrencyID(currency);

    this._hash = this.hashing();
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      this.token.toBuffer(),
      this.sender.toBuffer(),
      this.contract.toBuffer(),
      this.serviceID.toBuffer(),
      this.projectID.toBuffer(),
      this.requestTimeStamp.toBuffer("fill"),
      this.data.toBuffer(),
      this.currency.toBuffer(),
    ]);
  }

  toHintedObject(): FactJson {
    return {
      ...super.toHintedObject(),
      sender: this.sender.toString(),
      target: this.contract.toString(),
      service: this.serviceID.toString(),
      projectid: this.projectID.toString(),
      request_timestamp: this.requestTimeStamp.v,
      data: this.data.toString(),
      currency: this.currency.toString(),
    };
  }

  get operationHint() {
    return AppendHint;
  }
}
