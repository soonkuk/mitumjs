import base58 from "bs58";

import { Item } from "./item";
import { FactJson } from "./iFact";

import { Address } from "../account/address";
import { Hint, Token } from "./property";
import { MitumConfig } from "../utils/config";
import { SortFunc, sha3 } from "../utils/math";
import { Assert, ECODE, MitumError } from "../utils/error";
import { IBuffer, IHintedObject } from "./interface";

export abstract class Fact implements IBuffer, IHintedObject {
  private hint: Hint;
  readonly token: Token;
  protected _hash: Buffer;
  readonly items?: Item[];

  constructor(hint: string, token: string) {
    this.hint = new Hint(hint);
    this.token = new Token(token);
    this._hash = Buffer.from([]);
  }

  get hash() {
    return this._hash;
  }

  hashing() {
    return sha3(this.toBuffer());
  }

  toBuffer(): Buffer {
    return this.token.toBuffer();
  }

  toHintedObject(): FactJson {
    return {
      _hint: this.hint.toString(),
      hash: base58.encode(this.hash ? this.hash : []),
      token: this.token.toString(),
    };
  }

  abstract get operationHint(): string;
}

export abstract class OperationFact<T extends Item> extends Fact {
  readonly sender: Address;
  readonly items: T[];

  constructor(
    hint: string,
    token: string,
    sender: string | Address,
    items: T[]
  ) {
    super(hint, token);
    this.sender = Address.from(sender);

    Assert.check(MitumConfig.ITEMS_IN_FACT.satisfy(items.length));
    Assert.check(
      new Set(items.map((i) => i.toString())).size === items.length,
      MitumError.detail(ECODE.INVALID_ITEMS, "duplicate items found")
    );
    this.items = items;

    this._hash = this.hashing();
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      super.toBuffer(),
      this.sender.toBuffer(),
      Buffer.concat(this.items.sort(SortFunc).map((i) => i.toBuffer())),
    ]);
  }

  toHintedObject(): FactJson {
    return {
      ...super.toHintedObject(),
      sender: this.sender.toString(),
      items: this.items.sort(SortFunc).map((i) => i.toHintedObject()),
    };
  }
}

export abstract class NodeFact extends Fact {
  constructor(hint: string, token: string) {
    super(hint, token);
  }
}
