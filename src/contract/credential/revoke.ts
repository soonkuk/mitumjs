import { Assert, MitumError, ECODE } from "../../utils/error.js";
import { OperationFact } from "../../types/fact.js";
import { CredentialsItem } from "./item.js";
import { HintedObject } from "../../types/interface.js";

const RevokeCredentialsItemHint = "mitum-credential-revoke-credentials-item";
const RevokeCredentialsFactHint =
  "mitum-credential-revoke-credentials-operation-fact";
const RevokeCredentialsHint = "mitum-credential-revoke-credentials-operation";

const MaxRevokeCredentialsItems = 20;

export class RevokeCredentialsItem extends CredentialsItem {
  constructor(
    contract: string,
    credentialServiceID: string,
    holder: string,
    templateID: number,
    id: string,
    currency: string
  ) {
    super(
      RevokeCredentialsItemHint,
      contract,
      credentialServiceID,
      holder,
      templateID,
      id,
      currency
    );
  }

  toBuffer(): Buffer {
    return Buffer.concat([super.toBuffer(), this.currency.toBuffer()]);
  }

  toString(): string {
    return super.toString();
  }

  toHintedObject(): HintedObject {
    return { ...super.toHintedObject() };
  }
}

export class RevokeCredentialsFact extends OperationFact<RevokeCredentialsItem> {
  constructor(token: string, sender: string, items: RevokeCredentialsItem[]) {
    super(RevokeCredentialsFactHint, token, sender, items);

    items.forEach((item) => {
      Assert.check(
        item instanceof RevokeCredentialsItem,
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
      items.length <= MaxRevokeCredentialsItems,
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
    return RevokeCredentialsHint;
  }
}
