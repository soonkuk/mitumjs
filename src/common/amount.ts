import { Hint } from "./hint"
import { CurrencyID } from "./id"

import { HINT } from "../alias"
import { Assert, ECODE, MitumError } from "../error"
import { Big, HintedObject, IBuffer, IHintedObject } from "../types"

export class Amount implements IBuffer, IHintedObject {
    private static hint: Hint = new Hint(HINT.CURRENCY.AMOUNT)
    readonly currency: CurrencyID
    readonly big: Big

    constructor(currency: string | CurrencyID, big: string | number | Big) {
        this.currency = CurrencyID.from(currency)
        this.big = Big.from(big)
        Assert.check(0 < this.big.big, MitumError.detail(ECODE.INVALID_AMOUNT, "zero big"))
    }

    toBuffer(): Buffer {
        return Buffer.concat([
            this.big.toBuffer(),
            this.currency.toBuffer(),
        ])
    }

    toHintedObject(): HintedObject {
        return {
            _hint: Amount.hint.toString(),
            currency: this.currency.toString(),
            amount: this.big.toString(),
        }
    }
}