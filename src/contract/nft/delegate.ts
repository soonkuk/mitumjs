import { MitumError, Assert, ECODE } from "../../utils/error.js";
import { ContractID, CurrencyID } from "../../types/property.js";
import { HintedObject } from "../../types/interface.js";
import { OperationFact } from "../../types/fact.js";
import { HINT_NFT } from "../../types/hintNft.js";

import { Address } from "../../account/address.js";
import { NFTItem } from "./item.js";

type ALLOW = "allow";
type CANCEL = "cancel";

export type DELEGATE = ALLOW | CANCEL;

export class DelegateItem extends NFTItem {
  operator: Address;
  mode: DELEGATE;

  constructor(
    contract: Address,
    collection: ContractID,
    operator: string,
    mode: DELEGATE,
    currency: CurrencyID
  ) {
    super(HINT_NFT.HINT_DELEGATE_ITEM, contract, collection, currency);

    Assert.check(
      contract.toString() !== operator,
      MitumError.detail(
        ECODE.INVALID_ITEM,
        "The contract address is the same as the operator address."
      )
    );
    Assert.check(
      mode === "allow" || mode === "cancel",
      MitumError.detail(
        ECODE.INVALID_ITEM,
        "The value of 'mode' must be one of 'allow' or 'cancel'."
      )
    );

    this.operator = new Address(operator);
    this.mode = mode;
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      super.toBuffer(),
      this.operator.toBuffer(),
      Buffer.from(this.mode),
      this.currency.toBuffer(),
    ]);
  }

  toHintedObject(): HintedObject {
    return {
      ...super.toHintedObject(),
      operator: this.operator.toString,
      mode: this.mode,
    };
  }

  toString(): string {
    return (
      this.contract.toString() +
      this.collection.toString() +
      this.operator.toString()
    );
  }
}

export class DelegateFact extends OperationFact<DelegateItem> {
  constructor(token: string, sender: string, items: DelegateItem[]) {
    super(HINT_NFT.HINT_DELEGATE_OPERATION_FACT, token, sender, items);

    Assert.check(
      new Set(items.map((it) => it.toString())).size === items.length,
      MitumError.detail(ECODE.INVALID_ITEMS, "A duplicate item exists")
    );

    items.forEach((item) => {
      Assert.check(
        item instanceof DelegateItem,
        MitumError.detail(
          ECODE.INVALID_ITEMS,
          "An invalidly formatted item exists."
        )
      );
      Assert.check(
        item.contract.toString() !== sender,
        MitumError.detail(
          ECODE.INVALID_ITEMS,
          "The contract address is the same as the sender address."
        )
      );
    });
  }

  get operationHint() {
    return HINT_NFT.HINT_DELEGATE_OPERATION;
  }
}
