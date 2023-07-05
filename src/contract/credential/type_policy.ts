import { Item } from "../../types/item.js";
import { Address } from "../../account/address.js";
import { Big } from "../../utils/math.js";
import { String } from "../../types/string.js";
import { HintedObject } from "../../types/interface.js";

const HolderHint = "mitum-credential-holder";

export class Holder extends Item {
  readonly holder: Address;
  readonly templateID: Big;
  readonly id: String;
  readonly value: String;
  readonly validfrom: Big;
  readonly validuntil: Big;
  readonly did: String;

  constructor(
    holder: string,
    templateID: number,
    id: string,
    value: string,
    validfrom: number,
    validuntil: number,
    did: string
  ) {
    super(CredentialHint);

    this.holder = new Address(holder);
    this.templateID = new Big(templateID);
    this.id = new String(id);
    this.value = new String(value);
    this.validfrom = new Big(validfrom);
    this.validuntil = new Big(validuntil);
    this.did = new String(did);
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      this.holder.toBuffer(),
      this.templateID.toBuffer("fill"),
      this.id.toBuffer(),
      this.value.toBuffer(),
      this.validfrom.toBuffer("fill"),
      this.validuntil.toBuffer("fill"),
      this.did.toBuffer(),
    ]);
  }

  toString(): string {
    return this.did.toString();
  }

  toHintedObject(): HintedObject {
    return {
      ...super.toHintedObject(),
      holder: this.holder.toString(),
      templateID: this.templateID.v,
      id: this.id.toString(),
      value: this.value.toString(),
      validfrom: this.validfrom.v,
      validuntil: this.validuntil.v,
      did: this.did.toString(),
    };
  }
}
