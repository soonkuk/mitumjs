import { Item } from "../base"

import { Config } from "../../node"
import { Amount } from "../../common"
import { SortFunc } from "../../utils"
import { KeyPairType } from "../../key"
import { HintedObject } from "../../types"
import { Assert, ECODE, MitumError } from "../../error"

export abstract class CurrencyItem extends Item {
    readonly amounts: Amount[]
    readonly addressType: KeyPairType | ""

    constructor(hint: string, amounts: Amount[], addressType?: KeyPairType) {
        super(hint)

        Assert.check(
            Config.AMOUNTS_IN_ITEM.satisfy(amounts.length),
            MitumError.detail(ECODE.INVALID_AMOUNTS, "amounts length out of range")
        )
        Assert.check(
            new Set(amounts.map(am => am.currency.toString())).size === amounts.length,
            MitumError.detail(ECODE.INVALID_AMOUNTS, "duplicate amounts found in amounts")
        )

        this.amounts = amounts
        this.addressType = addressType ?? ""
    }

    toHintedObject(): HintedObject {
        return {
            ...super.toHintedObject(),
            amounts: this.amounts.sort(SortFunc).map(am => am.toHintedObject()),
        }
    }
}