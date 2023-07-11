import { Address } from "../../account/address.js";
import { NFTItem } from "./item.js";

import { MitumError, Assert, ECODE } from "../../utils/error.js";
import { Big } from "../../utils/math.js";
import { HintedObject } from "../../types/interface.js";
import { OperationFact } from "../../types/fact.js";
import { HINT_NFT } from "../../types/hintNft.js";

export class ApproveItem extends NFTItem {
  readonly approved: Address;
  readonly tokenId: Big;

  constructor(
    contract: string,
    collection: string,
    approved: string,
    tokenId: string | number | Buffer | BigInt | Uint8Array,
    currency: string
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
    this.tokenId = new Big(tokenId);
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      super.toBuffer(),
      this.approved.toBuffer(),
      this.tokenId.toBuffer("fill"),
      this.currency.toBuffer(),
    ]);
  }

  toHintedObject(): HintedObject {
    return {
      ...super.toHintedObject(),
      approved: this.approved.toString(),
      nftidx: this.tokenId.v,
    };
  }

  toString(): string {
    return this.tokenId.toString();
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
