import { ContractFact, FactJson } from "../base"

import { Address } from "../../key"
import { ContractID, CurrencyID } from "../../common"

export abstract class STOFact extends ContractFact {
    readonly sto: ContractID

    constructor(
        hint: string,
        token: string,
        sender: string | Address,
        contract: string | Address,
        sto: string | ContractID,
        currency: string | CurrencyID,
    ) {
        super(hint, token, sender, contract, currency)
        this.sto = ContractID.from(sto)
        this._hash = this.hashing()
    }

    toBuffer(): Buffer {
        return Buffer.concat([
            super.toBuffer(),
            this.sto.toBuffer(),
        ])
    }

    toHintedObject(): FactJson {
        return {
            ...super.toHintedObject(),
            stoid: this.sto.toString(),
        }
    }
}