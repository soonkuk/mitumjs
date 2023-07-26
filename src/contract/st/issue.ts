import { Assert, MitumError, ECODE } from "../../utils/error.js";
import { HintedObject } from "../../types/interface.js";
import { OperationFact } from "../../types/fact.js";
import { Big } from "../../utils/math.js";

import { Address } from "../../account/address.js";
import { Partition } from "./partition.js";
import { STItem } from "./item.js";

const IssueSecurityTokensItemHint = "mitum-sto-issue-security-tokens-item";
const IssueSecurityTokensFactHint =
  "mitum-sto-issue-security-tokens-operation-fact";
const IssueSecurityTokensHint = "mitum-sto-issue-security-tokens-operation";

const MaxIssueSecurityTokensItems = 20;

export class IssueSecurityTokensItem extends STItem {
  readonly receiver: Address;
  readonly amount: Big;
  readonly partition: Partition;

  constructor(
    contract: string,
    serviceID: string,
    receiver: string,
    amount: number,
    partition: string,
    currency: string
  ) {
    super(IssueSecurityTokensItemHint, contract, serviceID, currency);

    this.receiver = new Address(receiver);
    this.amount = new Big(amount);
    this.partition = new Partition(partition);
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      super.toBuffer(),
      this.receiver.toBuffer(),
      this.amount.toBuffer("fill"),
      this.partition.toBuffer(),
      this.currency.toBuffer(),
    ]);
  }

  toString(): string {
    return this.receiver.toString();
  }

  toHintedObject(): HintedObject {
    return {
      ...super.toHintedObject(),
      receiver: this.receiver.toString(),
      amount: this.amount.toString(),
      partition: this.partition.toString(),
    };
  }
}

export class IssueSecurityTokensFact extends OperationFact<IssueSecurityTokensItem> {
  constructor(token: string, sender: string, items: IssueSecurityTokensItem[]) {
    super(IssueSecurityTokensFactHint, token, sender, items);

    items.forEach((item) => {
      Assert.check(
        item instanceof IssueSecurityTokensItem,
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
      items.length <= MaxIssueSecurityTokensItems,
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
    return IssueSecurityTokensHint;
  }
}
