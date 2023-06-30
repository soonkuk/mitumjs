import bs58 from "bs58";

import { Address } from "../../account/address.js";
import { ContractID, CurrencyID } from "../../types/property.js";
import { Fact } from "../../types/fact.js";
import { MitumError, Assert, ECODE } from "../../utils/error.js";
import { HINT_NFT } from "../../types/hintNft.js";
import { MitumConfig } from "../../utils/config.js";
import { SortFunc } from "../../utils/math";
import { CollectionName, PaymentParam, NFTURI } from "./policy.js";

export class CollectionPolicyUpdaterFact extends Fact {
  readonly sender: Address;
  readonly contract: Address;
  readonly name: CollectionName;
  readonly royalty: PaymentParam;
  readonly uri: NFTURI;
  readonly collection: ContractID;
  readonly whites: Address[];
  readonly currency: CurrencyID;

  constructor(
    token: string,
    sender: string,
    contract: string,
    collection: string,
    name: string,
    royalty: string | number | Buffer | BigInt | Uint8Array,
    uri: string,
    whites: string[],
    currency: string
  ) {
    super(HINT_NFT.HINT_COLLECTION_POLICY_UPDATER_OPERATION_FACT, token);

    Assert.check(
      contract !== sender,
      MitumError.detail(
        ECODE.INVALID_PARAMETER,
        "The contract address is the same as the sender address."
      )
    );

    this.sender = new Address(sender);
    this.contract = new Address(contract);
    this.name = new CollectionName(name);
    this.royalty = new PaymentParam(royalty);
    this.uri = new NFTURI(uri);
    this.collection = new ContractID(collection);

    Assert.check(
      Array.isArray(whites),
      MitumError.detail(ECODE.INVALID_PARAMETER, "'whites' is not Array.")
    );
    Assert.check(
      MitumConfig.MAX_WHITELIST_IN_COLLECTION.satisfy(whites.length),
      MitumError.detail(
        ECODE.INVALID_PARAMETER,
        "White-lists length is out of range."
      )
    );

    this.whites = whites.map((w) => {
      Assert.check(
        typeof w === "string",
        MitumError.detail(
          ECODE.INVALID_PARAMETER,
          "The element type of 'white-lists' is incorrect."
        )
      );

      return new Address(w);
    });

    const wSet = new Set(this.whites);
    Assert.check(
      wSet.size === whites.length,
      MitumError.detail(ECODE.INVALID_PARAMETER, "A duplicate item exists.")
    );

    this.currency = new CurrencyID(currency);
    this._hash = this.hashing();
  }

  toBuffer() {
    return Buffer.concat([
      this.token.toBuffer(),
      this.sender.toBuffer(),
      this.contract.toBuffer(),
      this.collection.toBuffer(),
      this.name.toBuffer(),
      this.royalty.toBuffer(),
      this.uri.toBuffer(),
      this.currency.toBuffer(),
      Buffer.concat(this.whites.sort(SortFunc).map((w) => w.toBuffer())),
    ]);
  }

  toHintedObject() {
    return {
      ...super.toHintedObject(),
      hash: bs58.encode(this.hash),
      token: this.token.toString(),
      sender: this.sender.toString(),
      contract: this.contract.toString(),
      collection: this.collection.toString(),
      name: this.name.toString(),
      royalty: this.royalty.v,
      uri: this.uri.toString(),
      whites: this.whites.sort(SortFunc).map((w) => w.toString()),
      currency: this.currency.toString(),
    };
  }

  get operationHint() {
    return HINT_NFT.HINT_COLLECTION_POLICY_UPDATER_OPERATION;
  }
}
