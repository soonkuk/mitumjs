import { Fact, FactJson } from "../base"

import { HINT } from "../../alias"
import { Address } from "../../key"
import { ContractID, CurrencyID } from "../../common"
import { Big } from "../../types"
import { Assert, ECODE, MitumError } from "../../error"
import { Config } from "../../node"

export class AppendFact extends Fact {
    readonly sender: Address
    readonly target: Address
    readonly service: ContractID
    readonly projectID: string
    readonly requestTimeStamp: Big
    readonly data: string
    readonly currency: CurrencyID

    constructor(
        token: string, 
        sender: string | Address, 
        target: string | Address, 
        service: string | ContractID,
        projectID: string,
        requestTimeStamp: number | Big,
        data: string,
        currency: string | CurrencyID,
    ) {
        super(HINT.TIMESTAMP.APPEND.FACT, token)
        this.sender = Address.from(sender)
        this.target = Address.from(target)
        this.service = ContractID.from(service)
        this.projectID = projectID
        this.requestTimeStamp = Big.from(requestTimeStamp)
        this.data = data
        this.currency = CurrencyID.from(currency)

        Assert.check(
            Config.TIMESTAMP.PROJECT_ID.satisfy(this.projectID.length),
            MitumError.detail(ECODE.INVALID_FACT, "project id length out of range"),
        )

        Assert.check(
            Config.TIMESTAMP.DATA.satisfy(this.data.length),
            MitumError.detail(ECODE.INVALID_FACT, "data length out of range"),
        )

        this._hash = this.hashing()
    }

    toBuffer(): Buffer {
        return Buffer.concat([
            this.token.toBuffer(),
            this.sender.toBuffer(),
            this.target.toBuffer(),
            this.service.toBuffer(),
            Buffer.from(this.projectID),
            this.requestTimeStamp.toBuffer("fill"),
            Buffer.from(this.data),
            this.currency.toBuffer(),
        ])
    }

    toHintedObject(): FactJson {
        return {
            ...super.toHintedObject(),
            sender: this.sender.toString(),
            target: this.target.toString(),
            service: this.service.toString(),
            projectid: this.projectID,
            request_timestamp: this.requestTimeStamp.v,
            data: this.data,
            currency: this.currency.toString(),
        }
    }

    get operationHint() {
        return HINT.TIMESTAMP.APPEND.OPERATION
    }
}