import { Item } from "../base"

import { Config } from "../../node"
import { Address } from "../../key"
import { HintedObject } from "../../types"
import { ContractID, CurrencyID } from "../../common"
import { Assert, ECODE, MitumError } from "../../error"

export abstract class CredentialItem extends Item {
    readonly contract: Address
    readonly service: ContractID
    readonly holder: Address
    readonly templateID: string
    readonly id: string
    readonly currency: CurrencyID

    constructor(
        hint: string, 
        contract: string | Address, 
        service: string | ContractID, 
        holder: string | Address,
        templateID: string, 
        id: string,
        currency: string | CurrencyID,
    ) {
        super(hint)

        this.contract = Address.from(contract)
        this.service = ContractID.from(service)
        this.holder = Address.from(holder)
        this.templateID = templateID
        this.id = id
        this.currency = CurrencyID.from(currency)

        Assert.check(
            Config.CREDENTIAL.TEMPLATE_ID.satisfy(templateID.length),
            MitumError.detail(ECODE.INVALID_ITEM, "template id length out of range"),
        )

        Assert.check(
            Config.CREDENTIAL.ID.satisfy(id.length),
            MitumError.detail(ECODE.INVALID_ITEM, "credential id length out of range"),
        )

        Assert.check(
            this.contract.toString() !== this.holder.toString(),
            MitumError.detail(ECODE.INVALID_ITEM, "contract is same with holder address")
        )
    }

    toHintedObject(): HintedObject {
        return {
            ...super.toHintedObject(),
            contract: this.contract.toString(),
            service: this.service.toString(),
            currency: this.currency.toString(),
        }
    }

    toString(): string {
        return `${this.contract.toString()}-${this.service.toString()}`
    }
}