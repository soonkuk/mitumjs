import { Fact, FactJson } from "../base"

import { HINT } from "../../alias"
import { CurrencyID } from "../../common"
import { Address, Keys } from "../../key"

export class KeyUpdaterFact extends Fact {
    readonly target: Address
    readonly keys: Keys
    readonly currency: CurrencyID

    constructor(token: string, target: string | Address, keys: Keys, currency: string | CurrencyID) {
        super(HINT.CURRENCY.KEY_UPDATER.FACT, token)
        this.target = Address.from(target)
        this.keys = keys
        this.currency = CurrencyID.from(currency)
        this._hash = this.hashing()
    }

    toBuffer(): Buffer {
        return Buffer.concat([
            this.token.toBuffer(),
            this.target.toBuffer(),
            this.keys.toBuffer(),
            this.currency.toBuffer(),
        ])
    }

    toHintedObject(): FactJson {
        return {
            ...super.toHintedObject(),
            target: this.target.toString(),
            keys: this.keys.toHintedObject(),
            currency: this.currency.toString(),
        }
    }

    get operationHint() {
        return HINT.CURRENCY.KEY_UPDATER.OPERATION
    }
}