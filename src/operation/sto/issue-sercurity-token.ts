import { STOItem } from "./item"
import { Partition } from "./partition"
import { OperationFact } from "../base"

import { HINT } from "../../alias"
import { Address } from "../../key"
import { ContractID, CurrencyID } from "../../common"
import { Assert, ECODE, MitumError } from "../../error"
import { Big, HintedObject } from "../../types"

export class IssueSecurityTokenItem extends STOItem {
    readonly receiver: Address
    readonly amount: Big
    readonly partition: Partition

    constructor(
        contract: string | Address, 
        sto: string | ContractID,
        receiver: string | Address,
        amount: string | number | Big,
        partition: string | Partition,
        currency: string | CurrencyID,
    ) {
        super(HINT.STO.ISSUE_SECURITY_TOKEN.ITEM, contract, sto, currency)

        this.receiver = Address.from(receiver)
        this.amount  = Big.from(amount)
        this.partition = Partition.from(partition)

        Assert.check(
            this.contract.toString() !== this.receiver.toString(),
            MitumError.detail(ECODE.INVALID_ITEM, "contract is same with receiver address")
        )

        Assert.check(
            !this.amount.isZero(),
            MitumError.detail(ECODE.INVALID_ITEM, "zero amount"),    
        )
    }

    toBuffer(): Buffer {
        return Buffer.concat([
            this.contract.toBuffer(),
            this.sto.toBuffer(),
            this.receiver.toBuffer(),
            this.amount.toBuffer(),
            this.partition.toBuffer(),
            this.currency.toBuffer(),
        ])
    }

    toHintedObject(): HintedObject {
        return {
            ...super.toHintedObject(),
            receiver: this.receiver.toString(),
            amount: this.amount.toString(),
            partition: this.partition.toString(),
        }
    }

    toString(): string {
        return `${super.toString()}`
    }
}

export class IssueSecurityTokenFact extends OperationFact<IssueSecurityTokenItem> {
    constructor(token: string, sender: string | Address, items: IssueSecurityTokenItem[]) {
        super(HINT.STO.ISSUE_SECURITY_TOKEN.FACT, token, sender, items)

        Assert.check(
            new Set(items.map(it => it.toString())).size === items.length,
            MitumError.detail(ECODE.INVALID_ITEMS, "duplicate contract-sto found in items")
        )
    }

    get operationHint() {
        return HINT.STO.ISSUE_SECURITY_TOKEN.OPERATION
    }
}