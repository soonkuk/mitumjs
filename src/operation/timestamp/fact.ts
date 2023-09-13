import { ContractFact, FactJson } from "../base"

import { Address } from "../../key"
import { ContractID, CurrencyID } from "../../common"

export abstract class TimeStampFact extends ContractFact {
    readonly service: ContractID

    constructor(
        hint: string,
        token: string,
        sender: string | Address,
        target: string | Address,
        service: string | ContractID,
        currency: string | CurrencyID,
    ) {
        super(hint, token, sender, target, currency)
        this.service = ContractID.from(service)
        this._hash = this.hashing()
    }

    toBuffer(): Buffer {
        return Buffer.concat([
            super.toBuffer(),
            this.service.toBuffer(),
        ])
    }

    toHintedObject(): FactJson {
        const fact = super.toHintedObject()
        delete fact['contract']

        return {
            ...fact,
            target: this.contract.toString(),
            service: this.service.toString(),
        }
    }
}