import { Item } from "../base"

import { Address } from "../../key"
import { HintedObject } from "../../types"
import { ContractID, CurrencyID } from "../../common"

export abstract class KYCItem extends Item {
    readonly contract: Address
    readonly kyc: ContractID
    readonly currency: CurrencyID

    constructor(
        hint: string, 
        contract: string | Address, 
        kyc: string | ContractID, 
        currency: string | CurrencyID,
    ) {
        super(hint)

        this.contract = Address.from(contract)
        this.kyc = ContractID.from(kyc)
        this.currency = CurrencyID.from(currency)
    }

    toHintedObject(): HintedObject {
        return {
            ...super.toHintedObject(),
            contract: this.contract.toString(),
            kycid: this.kyc.toString(),
            currency: this.currency.toString(),
        }
    }

    toString(): string {
        return `${this.contract.toString()}-${this.kyc.toString()}`
    }
}