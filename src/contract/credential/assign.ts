import { Assert, MitumError, ECODE } from "../../utils/error.js";
import { OperationFact } from "../../types/fact";
import { AssignCredentialsItem } from "./item";

const AssignCredentialsFactHint =
  "mitum-credential-assign-credentials-operation-fact";
const AssignCredentialsHint = "mitum-credential-assign-credentials-operation";

const MaxAssignCredentialsItems = 10;

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
