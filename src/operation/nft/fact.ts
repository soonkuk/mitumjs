import { ContractFact, FactJson } from "../base"

import { Address } from "../../key"
import { ContractID, CurrencyID } from "../../common"

export abstract class NFTFact extends ContractFact {
    readonly collection: ContractID

    constructor(
        hint: string,
        token: string,
        sender: string | Address,
        contract: string | Address,
        collection: string | ContractID,
        currency: string | CurrencyID,
    ) {
        super(hint, token, sender, contract, currency)
        this.collection = ContractID.from(collection)
        this._hash = this.hashing()
    }

    toBuffer(): Buffer {
        return Buffer.concat([
            super.toBuffer(),
            this.collection.toBuffer(),
        ])
    }

    toHintedObject(): FactJson {
        return {
            ...super.toHintedObject(),
            collection: this.collection.toString(),
        }
    }
}