import { Address } from "../../account/address.js";
import { ContractID, CurrencyID } from "../../types/property.js";
import { Fact } from "../../types/fact.js";
import { MitumError, Assert, ECODE } from "../../utils/error.js";
import { HINT_NFT } from "../../types/hintNft.js";
import { MitumConfig } from "../../utils/config.js";
import { SortFunc } from "../../utils/math";
import { CollectionName, PaymentParam, NFTURI } from "./policy.js";
import { FactJson } from "../../types/iFact.js";

export class CollectionPolicyUpdaterFact extends Fact {
  readonly sender: Address;
  readonly contract: Address;
  readonly collection: ContractID;
  readonly name: CollectionName;
  readonly royalty: PaymentParam;
  readonly uri: NFTURI;
  readonly whitelist: Address[];
  readonly currency: CurrencyID;

  constructor(
    token: string,
    sender: string,
    contract: string,
    collection: string,
    name: string,
    royalty: string | number | Buffer | BigInt | Uint8Array,
    uri: string,
    whitelist: string[],
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
    this.collection = new ContractID(collection);
    this.name = new CollectionName(name);
    this.royalty = new PaymentParam(royalty);
    this.uri = new NFTURI(uri);
    this.currency = new CurrencyID(currency);

    Assert.check(
      Array.isArray(whitelist),
      MitumError.detail(ECODE.INVALID_PARAMETER, "'whites' is not Array.")
    );
    Assert.check(
      MitumConfig.MAX_WHITELIST_IN_COLLECTION.satisfy(whitelist.length),
      MitumError.detail(
        ECODE.INVALID_PARAMETER,
        "White-lists length is out of range."
      )
    );

    this.whitelist = whitelist.map((w) => new Address(w));

    const wSet = new Set(whitelist);
    Assert.check(
      wSet.size === whitelist.length,
      MitumError.detail(ECODE.INVALID_PARAMETER, "A duplicate item exists.")
    );

    this._hash = this.hashing();
  }

  toBuffer() {
    return Buffer.concat([
      this.token.toBuffer(),
      this.sender.toBuffer(),
      this.contract.toBuffer(),
      this.collection.toBuffer(),
      this.name.toBuffer(),
      this.royalty.toBuffer("fill"),
      this.uri.toBuffer(),
      this.currency.toBuffer(),
      Buffer.concat(this.whitelist.sort(SortFunc).map((w) => w.toBuffer())),
    ]);
  }

  toHintedObject(): FactJson {
    return {
      ...super.toHintedObject(),
      sender: this.sender.toString(),
      contract: this.contract.toString(),
      collection: this.collection.toString(),
      name: this.name.toString(),
      royalty: this.royalty.v,
      uri: this.uri.toString(),
      whitelist: this.whitelist.sort(SortFunc).map((w) => w.toString()),
      currency: this.currency.toString(),
    };
  }

  get operationHint() {
    return HINT_NFT.HINT_COLLECTION_POLICY_UPDATER_OPERATION;
  }
}
