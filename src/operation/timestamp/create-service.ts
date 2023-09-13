import { Fact, FactJson } from "../base"

import { HINT } from "../../alias"
import { Address } from "../../key"
import { ContractID, CurrencyID } from "../../common"

export class CreateServiceFact extends Fact {
    readonly sender: Address
    readonly target: Address
    readonly service: ContractID
    readonly currency: CurrencyID

    constructor(
        token: string, 
        sender: string | Address, 
        target: string | Address, 
        service: string | ContractID,
        currency: string | CurrencyID,
    ) {
        super(HINT.TIMESTAMP.CREATE_SERVICE.FACT, token)
        this.sender = Address.from(sender)
        this.target = Address.from(target)
        this.service = ContractID.from(service)
        this.currency = CurrencyID.from(currency)

        this._hash = this.hashing()
    }

    toBuffer(): Buffer {
        return Buffer.concat([
            this.token.toBuffer(),
            this.sender.toBuffer(),
            this.target.toBuffer(),
            this.service.toBuffer(),
            this.currency.toBuffer(),
        ])
    }

    toHintedObject(): FactJson {
        return {
            ...super.toHintedObject(),
            sender: this.sender.toString(),
            target: this.target.toString(),
            service: this.service.toString(),
            currency: this.currency.toString(),
        }
    }

    get operationHint() {
        return HINT.TIMESTAMP.CREATE_SERVICE.OPERATION
    }
}