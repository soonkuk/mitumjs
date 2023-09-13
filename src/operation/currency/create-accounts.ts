import base58 from "bs58"

import { CurrencyItem } from "./item"
import { OperationFact } from "../base"

import { Amount } from "../../common"
import { SortFunc } from "../../utils"
import { HINT, SUFFIX } from "../../alias"
import { HintedObject } from "../../types"
import { Keys, KeyPairType, Address } from "../../key"
import { Assert, ECODE, MitumError } from "../../error"

export class CreateAccountsItem extends CurrencyItem {
    readonly keys: Keys
    private addressSuffix: string

    constructor(keys: Keys, amounts: Amount[], addressType: KeyPairType) {
        super(HINT.CURRENCY.CREATE_ACCOUNTS.ITEM, amounts, addressType)
        this.keys = keys

        if (addressType === "btc") {
            this.addressSuffix = SUFFIX.ADDRESS.MITUM
        } else {
            this.addressSuffix = SUFFIX.ADDRESS.ETHER
        }
    }

    toBuffer(): Buffer {
        return Buffer.concat([
            this.keys.toBuffer(),
            Buffer.from(this.addressSuffix),
            Buffer.concat(this.amounts.sort(SortFunc).map(am => am.toBuffer())),
        ])
    }

    toHintedObject(): HintedObject {
        return {
            ...super.toHintedObject(),
            keys: this.keys.toHintedObject(),
            addrtype: this.addressSuffix
        }
    }

    toString(): string {
        return base58.encode(this.keys.toBuffer())
    }
}

export class CreateAccountsFact extends OperationFact<CreateAccountsItem> {
    constructor(token: string, sender: string | Address, items: CreateAccountsItem[]) {
        super(HINT.CURRENCY.CREATE_ACCOUNTS.FACT, token, sender, items)

        Assert.check(
            new Set(items.map(it => it.toString())).size === items.length,
            MitumError.detail(ECODE.INVALID_ITEMS, "duplicate key hash found in items")
        )
    }

    get operationHint() {
        return HINT.CURRENCY.CREATE_ACCOUNTS.OPERATION
    }
}