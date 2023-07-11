import { ContractID, CurrencyID } from "../../types/property.js";
import { FactJson } from "../../types/iFact.js";
import { Fact } from "../../types/fact.js";

import { Address } from "../../account/address.js";

const ServiceRegisterFactHint =
  "mitum-timestamp-service-register-operation-fact";
const ServiceRegisterHint = "mitum-timestamp-service-register-operation";

export class ServiceRegisterFact extends Fact {
  readonly sender: Address;
  readonly contract: Address;
  readonly serviceID: ContractID;
  readonly currency: CurrencyID;

  constructor(
    token: string,
    sender: string,
    contract: string,
    serviceID: string,
    currency: string
  ) {
    super(ServiceRegisterFactHint, token);

    this.sender = new Address(sender);
    this.contract = new Address(contract);
    this.serviceID = new ContractID(serviceID);
    this.currency = new CurrencyID(currency);

    this._hash = this.hashing();
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      this.token.toBuffer(),
      this.sender.toBuffer(),
      this.contract.toBuffer(),
      this.serviceID.toBuffer(),
      this.currency.toBuffer(),
    ]);
  }

  toHintedObject(): FactJson {
    return {
      ...super.toHintedObject(),
      sender: this.sender.toString(),
      target: this.contract.toString(),
      service: this.serviceID.toString(),
      currency: this.currency.toString(),
    };
  }

  get operationHint() {
    return ServiceRegisterHint;
  }
}
