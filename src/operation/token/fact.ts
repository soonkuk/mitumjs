import { ContractFact, FactJson } from "../base"

import { Address } from "../../key"
import { CurrencyID } from "../../common"
import { Assert, ECODE, MitumError } from "../../error"

export abstract class TokenFact extends ContractFact {
    readonly tokenID: CurrencyID

    constructor(
        hint: string,
        token: string,
        sender: string | Address,
        contract: string | Address,
        tokenID: string | CurrencyID, 
        currency: string | CurrencyID,
    ) {
        super(hint, token, sender, contract, currency)
        this.tokenID = CurrencyID.from(tokenID)
        this._hash = this.hashing()
    }

    toBuffer(): Buffer {
        return Buffer.concat([
            super.toBuffer(),
            this.tokenID.toBuffer(),
            this.currency.toBuffer(),
        ])
    }

    toHintedObject(): FactJson {
        return {
            ...super.toHintedObject(),
            token_id: this.tokenID.toString(),
        }
    }
}