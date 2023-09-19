import { Fact, FactJson } from "../base"

import { HINT } from "../../alias"
import { Address } from "../../key"
import { SortFunc } from "../../utils"
import { CurrencyID } from "../../common"

export class UpdateOperatorFact extends Fact {
    readonly sender: Address
    readonly contract: Address
    readonly operators: Address[]
    readonly currency: CurrencyID

    constructor(
        token: string,
        sender: string | Address,
        contract: string | Address,
        operators: (string | Address)[],
        currency: string | CurrencyID
    ) {
        super(HINT.CURRENCY.UPDATE_OPERATOR.FACT, token)
        this.sender = Address.from(sender)
        this.contract = Address.from(contract)
        this.operators = operators.map(a => Address.from(a))
        this.currency = CurrencyID.from(currency)
        this._hash = this.hashing()
    }

    toBuffer(): Buffer {
        return Buffer.concat([
            super.toBuffer(),
            this.sender.toBuffer(),
            this.contract.toBuffer(),
            Buffer.concat(this.operators.sort(SortFunc).map(a => a.toBuffer())),
            this.currency.toBuffer(),
        ])
    }

    toHintedObject(): FactJson {
        return {
            ...super.toHintedObject(),
            sender: this.sender.toString(),
            contract: this.contract.toString(),
            whitelist: this.operators.sort(SortFunc).map((w) => w.toString()),
            currency: this.currency.toString(),
        }
    }

    get operationHint() {
        return HINT.CURRENCY.UPDATE_OPERATOR.OPERATION
    }
}