import { Address } from "../../account/address.js";
import { ContractID, CurrencyID } from "../../types/property.js";
import { Item } from "../../types/item.js";
import { HintedObject } from "../../types/interface.js";
import { Big } from "../../utils/math.js";
import { String } from "../../types/string.js";

const AssignCredentialsItemHint = "mitum-credential-assign-credentials-item";

export abstract class AssignCredentialsItem extends Item {
  readonly contract: Address;
  readonly credentialServiceID: ContractID;
  readonly holder: Address;
  readonly templateID: Big;
  readonly id: String;
  readonly value: String;
  readonly validfrom: Big;
  readonly validuntil: Big;
  readonly did: String;
  readonly currency: CurrencyID;

  constructor(
    hint: string,
    contract: string,
    credentialServiceID: string,
    holder: string,
    templateID: number,
    id: string,
    value: string,
    validfrom: number,
    validuntil: number,
    did: string,
    currency: string
  ) {
    super(hint);

    this.contract = new Address(contract);
    this.credentialServiceID = new ContractID(credentialServiceID);
    this.holder = new Address(holder);
    this.templateID = new Big(templateID);
    this.id = new String(id);
    this.value = new String(value);
    this.validfrom = new Big(validfrom);
    this.validuntil = new Big(validuntil);
    this.did = new String(did);
    this.currency = new CurrencyID(currency);
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      this.contract.toBuffer(),
      this.credentialServiceID.toBuffer(),
      this.holder.toBuffer(),
      this.templateID.toBuffer("fill"),
      this.id.toBuffer(),
      this.value.toBuffer(),
      this.validfrom.toBuffer("fill"),
      this.validuntil.toBuffer("fill"),
      this.did.toBuffer(),
      this.currency.toBuffer(),
    ]);
  }

  toHintedObject(): HintedObject {
    return {
      ...super.toHintedObject(),
      contract: this.contract.toString(),
      credentialServiceID: this.credentialServiceID.toString(),
      holder: this.holder.toString(),
      templateID: this.templateID.v,
      id: this.id.toString(),
      value: this.value.toString(),
      validfrom: this.validfrom.v,
      validuntil: this.validuntil.v,
      did: this.did.toString(),
      currency: this.currency.toString(),
    };
  }
}
