import { ContractFact, FactJson } from "../base"

import { Address } from "../../key"
import { ContractID, CurrencyID } from "../../common"

export abstract class KYCFact extends ContractFact {
    readonly kyc: ContractID

    constructor(
        hint: string,
        token: string,
        sender: string | Address,
        contract: string | Address,
        kyc: string | ContractID,
        currency: string | CurrencyID,
    ) {
        super(hint, token, sender, contract, currency)
        this.kyc = ContractID.from(kyc)
        this._hash = this.hashing()
    }

    toBuffer(): Buffer {
        return Buffer.concat([
            super.toBuffer(),
            this.kyc.toBuffer(),
        ])
    }

    toHintedObject(): FactJson {
        return {
            ...super.toHintedObject(),
            kycid: this.kyc.toString(),
        }
    }
}