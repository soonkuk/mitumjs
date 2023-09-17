import { Item } from "../base"

import { Address } from "../../key"
import { HintedObject } from "../../types"
import { ContractID, CurrencyID } from "../../common"

export abstract class STOItem extends Item {
    readonly contract: Address
    readonly sto: ContractID
    readonly currency: CurrencyID

    constructor(
        hint: string, 
        contract: string | Address, 
        sto: string | ContractID, 
        currency: string | CurrencyID,
    ) {
        super(hint)

        this.contract = Address.from(contract)
        this.sto = ContractID.from(sto)
        this.currency = CurrencyID.from(currency)
    }

    toHintedObject(): HintedObject {
        return {
            ...super.toHintedObject(),
            contract: this.contract.toString(),
            stoid: this.sto.toString(),
            currency: this.currency.toString(),
        }
    }

    toString(): string {
        return ""
    }
}