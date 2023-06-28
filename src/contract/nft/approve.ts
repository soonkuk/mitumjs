import { Address } from "../../account/address.js";
import { NFTItem } from "./item.js";

import { MitumError, Assert, ECODE } from "../../utils/error.js";
import { Big } from "../../utils/math.js";
import { ContractID, CurrencyID } from "../../types/property.js";
import { HintedObject } from "../../types/interface.js";
import { OperationFact } from "../../types/fact.js";
import { HINT_NFT } from "../../types/hintNft.js";

export class ApproveItem extends NFTItem {
  readonly approved: Address;
  readonly nft: Big;

  constructor(
    contract: Address,
    collection: ContractID,
    approved: string,
    nft: string | number | Buffer | BigInt | Uint8Array,
    currency: CurrencyID
  ) {
    super(HINT_NFT.HINT_APPROVE_ITEM, contract, collection, currency);

    Assert.check(
      contract.toString() !== approved,
      MitumError.detail(
        ECODE.INVALID_ITEM,
        "The contract address is the same as the 'approved' address."
      )
    );

    this.approved = new Address(approved);
    this.nft = new Big(nft);
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      super.toBuffer(),
      this.approved.toBuffer(),
      this.nft.toBuffer(),
      this.currency.toBuffer(),
    ]);
  }

  toHintedObject(): HintedObject {
    return {
      ...super.toHintedObject(),
      approved: this.approved.toString(),
      nft: this.nft.v,
    };
  }

  toString(): string {
    return this.nft.toString();
  }
}

export class ApproveFact extends OperationFact<ApproveItem> {
  constructor(token: string, sender: string | Address, items: ApproveItem[]) {
    super(HINT_NFT.HINT_APPROVE_OPERATION_FACT, token, sender, items);

    Assert.check(
      new Set(items.map((it) => it.toString())).size === items.length,
      MitumError.detail(ECODE.INVALID_ITEMS, "A duplicate item exists")
    );

    items.forEach((item) => {
      Assert.check(
        item instanceof ApproveItem,
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
    return HINT_NFT.HINT_APPROVE_OPERATION;
  }
}
