import { STOItem } from "./item"
import { Partition } from "./partition"
import { OperationFact } from "../base"

import { HINT } from "../../alias"
import { Address } from "../../key"
import { ContractID, CurrencyID } from "../../common"
import { Assert, ECODE, MitumError } from "../../error"
import { Big, HintedObject } from "../../types"
import { Config } from "../../node"
import { SortFunc, hasOverlappingAddress } from "../../utils"


export class CreateSecurityTokenItem extends STOItem {
    readonly granularity: Big
    readonly defaultPartition: Partition
    readonly controllers: Address[]

    constructor(
        contract: string | Address, 
        sto: string | ContractID,
        granularity: string | number | Big,
        defaultPartition: string | Partition,
        controllers: (string | Address)[],
        currency: string | CurrencyID,
    ) {
        super(HINT.STO.CREATE_SECURITY_TOKEN.ITEM, contract, sto, currency)

        this.granularity = Big.from(granularity)
        this.defaultPartition = Partition.from(defaultPartition)
        this.controllers = controllers ? controllers.map(a => Address.from(a)) : []

        Assert.check(
            !this.granularity.isZero(),
            MitumError.detail(ECODE.INVALID_ITEM, "zero granularity"),    
        )

        Assert.check(
            Config.STO.ADDRESS_IN_CONTROLLERS.satisfy(this.controllers.length),
            MitumError.detail(ECODE.INVALID_ITEM, "controllers length out of range"),
        )

        Assert.check(
            hasOverlappingAddress(this.controllers),
            MitumError.detail(ECODE.INVALID_ITEM, "duplicate address found in controllers"),
        )

        this.controllers.forEach(
            a => Assert.check(
                this.contract.toString() !== a.toString(),
                MitumError.detail(ECODE.INVALID_ITEM, "contract is same with controller address")
            )
        )
    }

    toBuffer(): Buffer {
        return Buffer.concat([
            this.contract.toBuffer(),
            this.sto.toBuffer(),
            this.granularity.toBuffer("fill"),
            this.defaultPartition.toBuffer(),
            Buffer.concat(this.controllers.sort(SortFunc).map(a => a.toBuffer())),
            this.currency.toBuffer(),
        ])
    }

    toHintedObject(): HintedObject {
        return {
            ...super.toHintedObject(),
            granularity: this.granularity.v,
            default_partition: this.defaultPartition.toString(),
            controllers: this.controllers.sort(SortFunc).map(a => a.toString()),
        }
    }

    toString(): string {
        return `${super.toString()}`
    }
}

export class CreateSecurityTokenFact extends OperationFact<CreateSecurityTokenItem> {
    constructor(token: string, sender: string | Address, items: CreateSecurityTokenItem[]) {
        super(HINT.STO.CREATE_SECURITY_TOKEN.FACT, token, sender, items)

        Assert.check(
            new Set(items.map(it => it.toString())).size === items.length,
            MitumError.detail(ECODE.INVALID_ITEMS, "duplicate contract-sto found in items")
        )
    }

    get operationHint() {
        return HINT.STO.CREATE_SECURITY_TOKEN.OPERATION
    }
}