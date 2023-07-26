import { Assert, MitumError, ECODE } from "../../utils/error.js";
import { OperationFact } from "../../types/fact.js";
import { HintedObject } from "../../types/interface.js";
import { STItem } from "./item.js";
import { Address } from "../../account/address.js";
import { Partition } from "./partition.js";

const RevokeOperatorsItemHint = "mitum-sto-revoke-operators-item";
const RevokeOperatorsFactHint = "mitum-sto-revoke-operator-operation-fact";
const RevokeOperatorsHint = "mitum-sto-revoke-operator-operation";

const MaxRevokeOperatorsItems = 20;

export class RevokeOperatorsItem extends STItem {
  readonly operator: Address;
  readonly partition: Partition;

  constructor(
    contract: string,
    serviceID: string,
    operator: string,
    partition: string,
    currency: string
  ) {
    super(RevokeOperatorsItemHint, contract, serviceID, currency);

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

export class RevokeOperatorsFact extends OperationFact<RevokeOperatorsItem> {
  constructor(token: string, sender: string, items: RevokeOperatorsItem[]) {
    super(RevokeOperatorsFactHint, token, sender, items);

    items.forEach((item) => {
      Assert.check(
        item instanceof RevokeOperatorsItem,
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
      items.length <= MaxRevokeOperatorsItems,
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
    return RevokeOperatorsHint;
  }
}
