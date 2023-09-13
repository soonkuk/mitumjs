import { ContractFact, FactJson } from "../base"

import { Address } from "../../key"
import { ContractID, CurrencyID } from "../../common"

export abstract class CredentialFact extends ContractFact {
    readonly service: ContractID

    constructor(
        hint: string,
        token: string,
        sender: string | Address,
        contract: string | Address,
        service: string | ContractID,
        currency: string | CurrencyID,
    ) {
        super(hint, token, sender, contract, currency)
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
        return {
            ...super.toHintedObject(),
            service_id: this.service.toString(),
        }
    }
}