import bs58 from "bs58";

import { Assert, MitumError, ECODE } from "../../utils/error.js";
import { ContractID, CurrencyID } from "../../types/property.js";
import { MitumConfig } from "../../utils/config.js";
import { HINT_NFT } from "../../types/hintNft.js";
import { FactJson } from "../../types/iFact.js";
// import { SortFunc } from "../../utils/math.js";
import { Fact } from "../../types/fact.js";

import { CollectionName, PaymentParam, NFTURI } from "./policy.js";
import { Address } from "../../account/address.js";

export type inputData = {
  contract: string;
  name: string;
  symbol: string;
  uri: string;
  royalty: string | number | Buffer | BigInt | Uint8Array;
  whiteLists: string[];
  currencyID: string;
};

export class CollectionRegisterFact extends Fact {
  readonly sender: Address;
  readonly contract: Address;
  readonly collection: ContractID;
  readonly name: CollectionName;
  readonly royalty: PaymentParam;
  readonly uri: NFTURI;
  readonly currency: CurrencyID;
  readonly whites: Address[];

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
    super(HINT_NFT.HINT_COLLECTION_REGISTER_OPERATION_FACT, token);

    this.sender = new Address(sender);
    this.contract = new Address(contract);
    this.collection = new ContractID(collection);
    this.name = new CollectionName(name);
    this.royalty = new PaymentParam(royalty);
    this.uri = new NFTURI(uri);
    this.currency = new CurrencyID(currency);

    Assert.check(
      Array.isArray(whites),
      MitumError.detail(
        ECODE.INVALID_PARAMETER,
        "'white-lists' of the params is not Array."
      )
    );
    Assert.check(
      MitumConfig.MAX_WHITELIST_IN_COLLECTION.satisfy(whites.length),
      MitumError.detail(
        ECODE.INVALID_PARAMETER,
        "'white-lists' length is out of range."
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

    this._hash = this.toBuffer();
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      this.token.toBuffer(),
      this.sender.toBuffer(),
      this.contract.toBuffer(),
      this.collection.toBuffer(),
      this.name.toBuffer(),
      this.royalty.toBuffer(),
      this.uri.toBuffer(),
      this.currency.toBuffer(),
      Buffer.concat(this.whites.map((w) => w.toBuffer())),
    ]);
  }

  toHintedObject(): FactJson {
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
      whites: this.whites.map((w) => w.toString()),
      currency: this.currency.toString(),
    };
  }

  get operationHint() {
    return HINT_NFT.HINT_COLLECTION_REGISTER_OPERATION;
  }
}
