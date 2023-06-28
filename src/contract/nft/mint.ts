import { HintedObject, IBuffer, IString } from "../../types/interface.js";
import { Assert, MitumError, ECODE } from "../../utils/error.js";
import { CurrencyID, ContractID } from "../../types/property.js";
import { OperationFact } from "../../types/fact.js";
import { MitumConfig } from "../../utils/config.js";
import { HINT_NFT } from "../../types/hintNft.js";

import { Address } from "../../account/address.js";
import { NFTSigners } from "./sign.js";
import { NFTURI } from "./policy.js";
import { NFTItem } from "./item.js";

export class NFTHash implements IBuffer, IString {
  readonly s: string;

  constructor(s: string) {
    Assert.check(
      typeof s === "string",
      MitumError.detail(
        ECODE.INVALID_PARAMETER,
        "The type of Hash is not 'string'."
      )
    );
    Assert.check(
      MitumConfig.MAX_NFT_HASH_LENGTH.satisfy(s.length),
      MitumError.detail(
        ECODE.INVALID_PARAMETER,
        "The NFT-hash's length is out of range."
      )
    );

    this.s = s;
  }

  toBuffer(): Buffer {
    return Buffer.from(this.s);
  }

  toString(): string {
    return this.s;
  }
}

export class MintItem extends NFTItem {
  readonly hash: NFTHash;
  readonly uri: NFTURI;
  readonly creators: NFTSigners;

  constructor(
    contract: Address,
    collection: ContractID,
    hash: string,
    uri: string,
    creators: NFTSigners,
    currency: CurrencyID
  ) {
    super(HINT_NFT.HINT_MINT_ITEM, contract, collection, currency);

    this.hash = new NFTHash(hash);
    this.uri = new NFTURI(uri);

    Assert.check(
      creators instanceof NFTSigners,
      MitumError.detail(
        ECODE.INVALID_PARAMETER,
        "The type of creators is incorrect."
      )
    );

    this.creators = creators;
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      super.toBuffer(),
      this.hash.toBuffer(),
      this.uri.toBuffer(),
      this.creators.toBuffer(),
      this.currency.toBuffer(),
    ]);
  }

  toHintedObject(): HintedObject {
    return {
      ...super.toHintedObject(),
      contract: this.contract.toString(),
      collection: this.collection.toString(),
      hash: this.hash.toString(),
      uri: this.uri.toString(),
      creators: this.creators.toHintedObject(),
      currency: this.currency.toString(),
    };
  }

  toString(): string {
    return this.collection.toString();
  }
}

export class MintFact extends OperationFact<MintItem> {
  constructor(token: string, sender: string, items: MintItem[]) {
    super(HINT_NFT.HINT_MINT_OPERATION_FACT, token, sender, items);

    items.forEach((item) =>
      Assert.check(
        item instanceof MintItem,
        MitumError.detail(
          ECODE.INVALID_PARAMETER,
          "The type of item is incorrect."
        )
      )
    );
  }

  get operationHint() {
    return HINT_NFT.HINT_MINT_OPERATION;
  }
}
