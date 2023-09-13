import { CredentialItem } from "./item"
import { OperationFact } from "../base"

import { HINT } from "../../alias"
import { Address } from "../../key"
import { ContractID, CurrencyID } from "../../common"
import { Assert, ECODE, MitumError } from "../../error"

export class RevokeItem extends CredentialItem {
    constructor(
        contract: string | Address, 
        service: string | ContractID,
        holder: string | Address, 
        templateID: string,
        id: string,
        currency: string | CurrencyID,
    ) {
        super(HINT.CREDENTIAL.REVOKE.ITEM, contract, service, holder, templateID, id, currency)
    }

    toBuffer(): Buffer {
        return Buffer.concat([
            this.contract.toBuffer(),
            this.service.toBuffer(),
            this.holder.toBuffer(),
            Buffer.from(this.templateID),
            Buffer.from(this.id),
            this.currency.toBuffer(),
        ])
    }

    toString(): string {
        return `${super.toString()}-${this.id}`
    }
}

export class RevokeFact extends OperationFact<RevokeItem> {
    constructor(token: string, sender: string | Address, items: RevokeItem[]) {
        super(HINT.CREDENTIAL.REVOKE.FACT, token, sender, items)

        Assert.check(
            new Set(items.map(it => it.toString())).size === items.length,
            MitumError.detail(ECODE.INVALID_ITEMS, "duplicate credential id found in items")
        )
    }

    get operationHint() {
        return HINT.CREDENTIAL.REVOKE.OPERATION
    }
}