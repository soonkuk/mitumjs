import { HintedObject } from "../types/interface.js";
import { KeyPairType } from "../types/address.js";
import { Amount } from "../types/property.js";
import { Item } from "../types/item.js";

import { Assert, ECODE, MitumError } from "../utils/error.js";
import { MitumConfig } from "../utils/config.js";
import { SortFunc } from "../utils/math.js";

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
