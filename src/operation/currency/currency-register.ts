import { NodeFact, FactJson } from "../base"
import { CurrencyDesign } from "./currency-design"

import { HINT } from "../../alias"

export class CurrencyRegisterFact extends NodeFact {
    readonly design: CurrencyDesign

    constructor(token: string, design: CurrencyDesign) {
        super(HINT.CURRENCY.CURRENCY_REGISTER.FACT, token)
        this.design = design
        this._hash = this.hashing()
    }

    toBuffer(): Buffer {
        return Buffer.concat([
            this.token.toBuffer(),
            this.design.toBuffer(),
        ])
    }

    toHintedObject(): FactJson {
        return {
            ...super.toHintedObject(),
            currency: this.design.toHintedObject(),
        }
    }

    get operationHint() {
        return HINT.CURRENCY.CURRENCY_REGISTER.OPERATION
    }
}