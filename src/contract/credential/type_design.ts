import { Item } from "../../types/item.js";
import { ContractID } from "../../types/property.js";
import { HintedObject } from "../../types/interface.js";

const DesignHint = "mitum-credential-design";

export class Design extends Item {
  readonly credentialServiceID: ContractID;
  readonly policy: Policy;

  constructor(credentialServiceID: string, policy: number) {
    super(DesignHint);

    this.credentialServiceID = new ContractID(credentialServiceID);
    this.policy = new Policy(policy);
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      this.credentialServiceID.toBuffer(),
      this.policy.toBuffer(),
    ]);
  }

  toString(): string {
    return this.credentialServiceID.toString();
  }

  toHintedObject(): HintedObject {
    return {
      ...super.toHintedObject(),
      credentialServiceID: this.credentialServiceID.toString(),
      policy: policy.toHintedObject(),
    };
  }
}
