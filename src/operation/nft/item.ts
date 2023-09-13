import { Item } from "../base"

import { Address } from "../../key"
import { HintedObject } from "../../types"
import { ContractID, CurrencyID } from "../../common"

export abstract class NFTItem extends Item {
    readonly contract: Address
    readonly collection: ContractID
    readonly currency: CurrencyID

    constructor(hint: string, contract: string | Address, collection: string | ContractID, currency: string | CurrencyID) {
        super(hint)

        this.contract = Address.from(contract)
        this.collection = ContractID.from(collection)
        this.currency = CurrencyID.from(currency)
    }

    toHintedObject(): HintedObject {
        return {
            ...super.toHintedObject(),
            contract: this.contract.toString(),
            collection: this.collection.toString(),
            currency: this.currency.toString(),
        }
    }

    toString(): string {
        return `${this.contract.toString()}-${this.collection.toString()}`
    }
}