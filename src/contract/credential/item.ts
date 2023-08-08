import { Address } from "../../account/address.js";
import { CurrencyID } from "../../types/property.js";
import { Item } from "../../types/item.js";
import { HintedObject } from "../../types/interface.js";
import { String } from "../../types/string.js";
import { ServiceID } from "../../types/serviceId.js";

export abstract class CredentialsItem extends Item {
  readonly contract: Address;
  readonly credentialServiceID: ServiceID;
  readonly holder: Address;
  readonly templateID: String;
  readonly id: String;
  readonly currency: CurrencyID;

  constructor(
    hint: string,
    contract: string,
    credentialServiceID: string,
    holder: string,
    templateID: string,
    id: string,
    currency: string
  ) {
    super(hint);

    this.contract = new Address(contract);
    this.credentialServiceID = new ServiceID(credentialServiceID);
    this.holder = new Address(holder);
    this.templateID = new String(templateID);
    this.id = new String(id);
    this.currency = new CurrencyID(currency);
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      this.contract.toBuffer(),
      this.credentialServiceID.toBuffer(),
      this.holder.toBuffer(),
      this.templateID.toBuffer(),
      this.id.toBuffer(),
    ]);
  }

  toHintedObject(): HintedObject {
    return {
      ...super.toHintedObject(),
      contract: this.contract.toString(),
      credential_service_id: this.credentialServiceID.toString(),
      holder: this.holder.toString(),
      template_id: this.templateID.toString(),
      id: this.id.toString(),
      currency: this.currency.toString(),
    };
  }

  toString(): string {
    return this.id.toString();
  }
}
