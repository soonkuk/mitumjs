import base58 from "bs58";

import { Assert, ECODE, MitumError } from "../utils/error.js";
import { SortFunc } from "../utils/math.js";

import { HintedObject } from "../types/interface.js";
import { KeyPairType } from "../types/address.js";
import { OperationFact } from "../types/fact.js";
import { HINT, SUFFIX } from "../types/hint.js";
import { Amount } from "../types/property.js";

import { CurrencyItem } from "../currency/currencyItem.js";
import { Address } from "../account/address.js";
import { Keys } from "../account/publicKey.js";

export class CreateContractAccountsFact extends OperationFact<CreateContractAccountsItem> {
  constructor(
    token: string,
    sender: string | Address,
    items: CreateContractAccountsItem[]
  ) {
    super(HINT.CREATE_CONTRACT_ACCOUNTS_OPERATION_FACT, token, sender, items);

    Assert.check(
      new Set(items.map((it) => it.addressType !== "")).size === 1,
      MitumError.detail(
        ECODE.INVALID_ITEMS,
        "not unified mitum versions of items"
      )
    );

    Assert.check(
      new Set(items.map((it) => it.toString())).size === items.length,
      MitumError.detail(
        ECODE.INVALID_ITEMS,
        "duplicate key hash found in items"
      )
    );
  }

  get operationHint() {
    return HINT.CREATE_CONTRACT_ACCOUNTS_OPERATION;
  }
}

export class CreateContractAccountsItem extends CurrencyItem {
  readonly keys: Keys;
  private addressSuffix: string;

  constructor(keys: Keys, amounts: Amount[], addressType?: KeyPairType) {
    super(HINT.CREATE_CONTRACT_ACCOUNTS_ITEM, amounts, addressType);
    this.keys = keys;

    if (addressType === "mitum") {
      this.addressSuffix = SUFFIX.ACCOUNT_ADDRESS;
    } else if (addressType === "ether") {
      this.addressSuffix = SUFFIX.ETHER_ACCOUNT_ADDRESS;
    } else {
      this.addressSuffix = "";
    }
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      this.keys.toBuffer(),
      Buffer.from(this.addressSuffix),
      Buffer.concat(this.amounts.sort(SortFunc).map((am) => am.toBuffer())),
    ]);
  }

  toHintedObject(): HintedObject {
    const item = {
      ...super.toHintedObject(),
      keys: this.keys.toHintedObject(),
    };

    if (this.addressSuffix) {
      return {
        ...item,
        addrtype: this.addressSuffix,
      };
    }

    return item;
  }

  toString(): string {
    return base58.encode(this.keys.toBuffer());
  }
}
