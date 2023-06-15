import { HintedObject } from "../types/interface";
import { KeyPairType } from "../types/address";
import { Amount } from "../types/property";
import { Item } from "../types/item";

import { Assert, ECODE, MitumError } from "../utils/error";
import { MitumConfig } from "../utils/config";
import { SortFunc } from "../utils/math";

export abstract class CurrencyItem extends Item {
  readonly amounts: Amount[];
  readonly addressType: KeyPairType | "";

  constructor(hint: string, amounts: Amount[], addressType?: KeyPairType) {
    super(hint);

    Assert.check(
      MitumConfig.AMOUNTS_IN_ITEM.satisfy(amounts.length),
      MitumError.detail(ECODE.INVALID_AMOUNTS, "amounts length out of range")
    );
    Assert.check(
      new Set(amounts.map((am) => am.currency.toString())).size ===
        amounts.length,
      MitumError.detail(
        ECODE.INVALID_AMOUNTS,
        "duplicate amounts found in amounts"
      )
    );

    this.amounts = amounts;
    this.addressType = addressType ?? "";
  }

  toHintedObject(): HintedObject {
    return {
      ...super.toHintedObject(),
      amounts: this.amounts.sort(SortFunc).map((am) => am.toHintedObject()),
    };
  }
}
