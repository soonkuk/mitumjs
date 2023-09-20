import { TokenFact } from "./fact"
import { FactJson } from "../base"

import { HINT } from "../../alias"
import { Address } from "../../key"
import { CurrencyID } from "../../common"
import { Big, LongString } from "../../types"
import { Assert, ECODE, MitumError } from "../../error"

export class RegisterTokenFact extends TokenFact {
    readonly symbol: LongString
    readonly amount: Big

    constructor(
        token: string,
        sender: string | Address,
        contract: string | Address,
        tokenID: string | CurrencyID,
        currency: string | CurrencyID,
        symbol: string | LongString,
        amount: string | number | Big,
    ) {
        super(HINT.TOKEN.REGISTER_TOKEN.FACT, token, sender, contract, tokenID, currency)

        this.symbol = LongString.from(symbol)
        this.amount = Big.from(amount)

        Assert.check(
            this.amount.compare(0) > 0,
            MitumError.detail(ECODE.INVALID_FACT, "amount under zero"),
        )
    }

    toBuffer(): Buffer {
        return Buffer.concat([
            super.toBuffer(),
            this.symbol.toBuffer(),
            this.amount.toBuffer(),
        ])
    }

    toHintedObject(): FactJson {
        return {
            ...super.toHintedObject(),
            symbol:  this.symbol.toString(),
            amount: this.amount.toString(),
        }
    }

    get operationHint() {
        return HINT.TOKEN.REGISTER_TOKEN.OPERATION
    }
}