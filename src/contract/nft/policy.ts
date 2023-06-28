import { Assert, MitumError, ECODE } from "../../utils/error.js";
import { HintedObject, IBuffer, IString } from "../../types/interface.js";
import { IHintedObject } from "../../types/interface.js";
import { MitumConfig } from "../../utils/config.js";
import { HINT_NFT } from "../../types/hintNft.js";
import { SortFunc } from "../../utils/math.js";
import { Hint } from "../../types/property.js";
import { Big } from "../../utils/math.js";

import { Address } from "../../account/address.js";

export class NFTURI implements IBuffer, IString {
  private s: string;

  constructor(s: string) {
    Assert.check(
      MitumConfig.MAX_URI_LENGTH.satisfy(s.length),
      MitumError.detail(
        ECODE.INVALID_PARAMETER,
        "NFT-URI's length is out of range."
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

export class PaymentParam implements IBuffer {
  private param: Big;

  constructor(param: string | number | Buffer | BigInt | Uint8Array) {
    this.param = new Big(param);

    Assert.check(
      MitumConfig.PAYMENT_PARAM.satisfy(this.param.v),
      MitumError.detail(
        ECODE.INVALID_PARAMETER,
        "PaymentParam's size is out of range."
      )
    );
  }

  toBuffer(): Buffer {
    return this.param.toBuffer();
  }

  get v() {
    return this.param.v;
  }
}

export class CollectionName implements IBuffer, IString {
  private s: string;

  constructor(s: string) {
    Assert.check(
      typeof s === "string",
      MitumError.detail(
        ECODE.INVALID_PARAMETER,
        "Collection-name's type must be of type 'string'."
      )
    );
    Assert.check(
      MitumConfig.COLLECTION_NAME_LENGTH.satisfy(s.length),
      MitumError.detail(
        ECODE.INVALID_PARAMETER,
        "Collection-name's length is out of range."
      )
    );

    this.s = s;
  }

  equal(name: CollectionName | string): boolean {
    if (!name) {
      return false;
    }

    if (!(name instanceof CollectionName)) {
      return false;
    }

    return this.toString() === name.toString();
  }

  toBuffer(): Buffer {
    return Buffer.from(this.s);
  }

  toString(): string {
    return this.s;
  }
}

export class CollectionPolicy implements IBuffer, IHintedObject {
  readonly hint: Hint;
  readonly name: CollectionName;
  readonly royalty: PaymentParam;
  readonly uri: NFTURI;
  readonly whites: Address[];

  constructor(
    name: string,
    royalty: string | number | Buffer | BigInt | Uint8Array,
    uri: string,
    whites: string[] | Address[]
  ) {
    this.hint = new Hint(HINT_NFT.HINT_COLLECTION_POLICY);
    this.name = new CollectionName(name);
    this.royalty = new PaymentParam(royalty);
    this.uri = new NFTURI(uri);

    Assert.check(
      Array.isArray(whites),
      MitumError.detail(ECODE.INVALID_PARAMETER, "White-lists is not Array.")
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
        typeof w === "string" || w instanceof Address,
        MitumError.detail(
          ECODE.INVALID_PARAMETER,
          "White-list's type is incorrect."
        )
      );

      return typeof w === "string" ? new Address(w) : w;
    });

    const wset = new Set(this.whites);
    Assert.check(
      wset.size === whites.length,
      MitumError.detail(
        ECODE.INVALID_PARAMETER,
        "A duplicate value exists in the white-lists."
      )
    );
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      this.name.toBuffer(),
      this.royalty.toBuffer(),
      this.uri.toBuffer(),
      Buffer.concat(this.whites.sort(SortFunc).map((w) => w.toBuffer())),
    ]);
  }

  toHintedObject(): HintedObject {
    return {
      _hint: this.hint.toString(),
      name: this.name.toString(),
      royalty: this.royalty.v,
      uri: this.uri.toString(),
      whites: this.whites.sort(SortFunc).map((w) => w.toString()),
    };
  }
}
