import { Item, NodeFact, FactJson } from "../base"

import { HINT } from "../../alias"
import { Config } from "../../node"
import { Address } from "../../key"
import { Amount } from "../../common"
import { SortFunc } from "../../utils"
import { HintedObject } from "../../types"
import { Assert, ECODE, MitumError } from "../../error"

export class SuffrageInflationItem extends Item {
    readonly amount: Amount
    readonly receiver: Address
    
    constructor(receiver: string | Address, amount: Amount) {
        super(HINT.CURRENCY.SUFFRAGE_INFLATION.ITEM)
        this.amount = amount
        this.receiver = Address.from(receiver)
    }

    toBuffer(): Buffer {
        return Buffer.concat([
            this.receiver.toBuffer(),
            this.amount.toBuffer(),
        ])
    }

    toHintedObject(): HintedObject {
        return {
            ...super.toHintedObject(),
            receiver: this.receiver.toString(),
            amount: this.amount.toHintedObject(),
        }
    }

    toString(): string {
        return `${this.receiver.toString()}-${this.amount.currency.toString()}`
    }
}

export class SuffrageInflationFact extends NodeFact {
    readonly items: SuffrageInflationItem[]

    constructor(token: string, items: SuffrageInflationItem[]) {
        super(HINT.CURRENCY.SUFFRAGE_INFLATION.FACT, token)

        Assert.check(
            Config.ITEMS_IN_FACT.satisfy(items.length),
            MitumError.detail(ECODE.INVALID_ITEMS, "items length out of range"),
        )

        Assert.check(
            new Set(items.map(it => it.toString())).size === items.length,
            MitumError.detail(ECODE.INVALID_ITEMS, "duplicate receiver-currency found in items"),
        )

        this.items = items
        this._hash = this.hashing()
    }

    toBuffer(): Buffer {
        return Buffer.concat([
            super.toBuffer(),
            Buffer.concat(this.items.sort(SortFunc).map(it => it.toBuffer())),
        ])
    }

    toHintedObject(): FactJson {
        return {
            ...super.toHintedObject(),
            items: this.items.sort(SortFunc).map(it => it.toHintedObject()),
        }
    }

    get operationHint() {
        return HINT.CURRENCY.SUFFRAGE_INFLATION.OPERATION
    }
}