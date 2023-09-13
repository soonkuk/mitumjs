import { TimeStampFact } from "./fact"

import { HINT } from "../../alias"
import { Address } from "../../key"
import { ContractID, CurrencyID } from "../../common"


export class CreateServiceFact extends TimeStampFact {
    constructor(
        token: string, 
        sender: string | Address, 
        target: string | Address, 
        service: string | ContractID,
        currency: string | CurrencyID,
    ) {
        super(HINT.TIMESTAMP.CREATE_SERVICE.FACT, token, sender, target, service, currency)
        this._hash = this.hashing()
    }

    toBuffer(): Buffer {
        return Buffer.concat([
            super.toBuffer(),
            this.currency.toBuffer(),
        ])
    }

    get operationHint() {
        return HINT.TIMESTAMP.CREATE_SERVICE.OPERATION
    }
}