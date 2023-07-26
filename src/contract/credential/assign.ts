import { Assert, MitumError, ECODE } from "../../utils/error.js";
import { OperationFact } from "../../types/fact.js";
import { CredentialsItem } from "./item.js";
import { Big } from "../../utils/math.js";
import { String } from "../../types/string.js";
import { HintedObject } from "../../types/interface.js";

const AssignCredentialsItemHint = "mitum-credential-assign-credentials-item";
const AssignCredentialsFactHint =
  "mitum-credential-assign-credentials-operation-fact";
const AssignCredentialsHint = "mitum-credential-assign-credentials-operation";

const MaxAssignCredentialsItems = 20;

export class AssignCredentialsItem extends CredentialsItem {
  readonly value: String;
  readonly validfrom: Big;
  readonly validuntil: Big;
  readonly did: String;

  constructor(
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
    super(
      AssignCredentialsItemHint,
      contract,
      credentialServiceID,
      holder,
      templateID,
      id,
      currency
    );

    this.value = new String(value);
    this.validfrom = new Big(validfrom);
    this.validuntil = new Big(validuntil);
    this.did = new String(did);
  }

  toString(): string {
    return this.value.toString();
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      super.toBuffer(),
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
      value: this.value.toString(),
      valid_from: this.validfrom.v,
      valid_until: this.validuntil.v,
      did: this.did.toString(),
    };
  }
}

export class AssignCredentialsFact extends OperationFact<AssignCredentialsItem> {
  constructor(token: string, sender: string, items: AssignCredentialsItem[]) {
    super(AssignCredentialsFactHint, token, sender, items);

    items.forEach((item) => {
      Assert.check(
        item instanceof AssignCredentialsItem,
        MitumError.detail(
          ECODE.INVALID_PARAMETER,
          "The type of items is incorrect."
        )
      );
      Assert.check(
        item.contract.toString() !== sender,
        MitumError.detail(
          ECODE.INVALID_PARAMETER,
          "The contract address is the same as the sender address."
        )
      );
    });

    Assert.check(
      items.length <= MaxAssignCredentialsItems,
      MitumError.detail(
        ECODE.INVALID_PARAMETER,
        "The number of elements in items is too many."
      )
    );

    const iSet = new Set(items.map((item) => item.toString()));
    Assert.check(
      iSet.size === items.length,
      MitumError.detail(
        ECODE.INVALID_PARAMETER,
        "There are duplicate elements in items."
      )
    );
  }

  get operationHint() {
    return AssignCredentialsHint;
  }
}
