import { Assert, MitumError, ECODE } from "../../utils/error.js";
import { HintedObject } from "../../types/interface.js";
import { OperationFact } from "../../types/fact.js";
import { Big } from "../../utils/math.js";

import { Address } from "../../account/address.js";
import { Partition } from "./partition.js";
import { STItem } from "./item.js";

const TransferSecurityTokensPartitionItemHint =
  "mitum-sto-transfer-security-tokens-partition-item";
const TransferSecurityTokensPartitionFactHint =
  "mitum-sto-transfer-security-tokens-partition-operation-fact";
const TransferSecurityTokensPartitionHint =
  "mitum-sto-transfer-security-tokens-partition-operation";

const MaxTransferSecurityTokensPartitionItems = 20;

export class TransferSecurityTokensPartitionItem extends STItem {
  readonly tokenholder: Address;
  readonly receiver: Address;
  readonly partition: Partition;
  readonly amount: Big;

  constructor(
    contract: string,
    serviceID: string,
    tokenholder: string,
    receiver: string,
    partition: string,
    amount: number,
    currency: string
  ) {
    super(
      TransferSecurityTokensPartitionItemHint,
      contract,
      serviceID,
      currency
    );

    this.tokenholder = new Address(tokenholder);
    this.receiver = new Address(receiver);
    this.amount = new Big(amount);
    this.partition = new Partition(partition);
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      super.toBuffer(),
      this.tokenholder.toBuffer(),
      this.receiver.toBuffer(),
      this.partition.toBuffer(),
      this.amount.toBuffer("fill"),
      this.currency.toBuffer(),
    ]);
  }

  toString(): string {
    return this.receiver.toString();
  }

  toHintedObject(): HintedObject {
    return {
      ...super.toHintedObject(),
      tokenholder: this.tokenholder.toString(),
      receiver: this.receiver.toString(),
      partition: this.partition.toString(),
      amount: this.amount.toString(),
    };
  }
}

export class TransferSecurityTokensPartitionFact extends OperationFact<TransferSecurityTokensPartitionItem> {
  constructor(
    token: string,
    sender: string,
    items: TransferSecurityTokensPartitionItem[]
  ) {
    super(TransferSecurityTokensPartitionFactHint, token, sender, items);

    items.forEach((item) => {
      Assert.check(
        item instanceof TransferSecurityTokensPartitionItem,
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
      items.length <= MaxTransferSecurityTokensPartitionItems,
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
    return TransferSecurityTokensPartitionHint;
  }
}
