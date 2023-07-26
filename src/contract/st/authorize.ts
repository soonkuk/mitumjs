import { Assert, MitumError, ECODE } from "../../utils/error.js";
import { OperationFact } from "../../types/fact.js";
import { HintedObject } from "../../types/interface.js";
import { STItem } from "./item.js";
import { Address } from "../../account/address.js";
import { Partition } from "./partition.js";

const AuthorizeOperatorsItemHint = "mitum-sto-authorize-operators-item";
const AuthorizeOperatorsFactHint =
  "mitum-sto-authorize-operator-operation-fact";
const AuthorizeOperatorsHint = "mitum-sto-authorize-operator-operation";

const MaxAuthorizeOperatorsItems = 20;

export class AuthorizeOperatorsItem extends STItem {
  readonly operator: Address;
  readonly partition: Partition;

  constructor(
    contract: string,
    serviceID: string,
    operator: string,
    partition: string,
    currency: string
  ) {
    super(AuthorizeOperatorsItemHint, contract, serviceID, currency);

    this.operator = new Address(operator);
    this.partition = new Partition(partition);
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      super.toBuffer(),
      this.operator.toBuffer(),
      this.partition.toBuffer(),
      this.currency.toBuffer(),
    ]);
  }

  toString(): string {
    return this.operator.toString();
  }

  toHintedObject(): HintedObject {
    return {
      ...super.toHintedObject(),
      operator: this.operator.toString(),
      partition: this.partition.toString(),
    };
  }
}

export class AuthorizeOperatorsFact extends OperationFact<AuthorizeOperatorsItem> {
  constructor(token: string, sender: string, items: AuthorizeOperatorsItem[]) {
    super(AuthorizeOperatorsFactHint, token, sender, items);

    items.forEach((item) => {
      Assert.check(
        item instanceof AuthorizeOperatorsItem,
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
      items.length <= MaxAuthorizeOperatorsItems,
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
    return AuthorizeOperatorsHint;
  }
}
