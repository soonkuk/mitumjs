import { RegisterTokenFact } from "./register-token"
import { MintFact } from "./mint"
import { BurnFact } from "./burn"
import { TransferFact } from "./transfer"
import { ApproveFact } from "./approve"
import { TransferFromFact } from "./transfer-from"

import { ContractGenerator, Operation } from "../base"

import { Address } from "../../key"
import { CurrencyID } from "../../common"
import { Big, IP, LongString, TimeStamp } from "../../types"

export class Token extends ContractGenerator {
    constructor(
        networkID: string,
        contract?: string | Address,
        api?: string | IP,
    ) {
        super(networkID, contract, api)
    }

    registerToken(
        sender: string | Address,
        tokenID: string | CurrencyID,
        currency: string | CurrencyID,
        symbol: string | LongString,
        amount?: string | number | Big,
    ) {
        return new Operation(
            this.networkID,
            new RegisterTokenFact(
                TimeStamp.new().UTC(),
                sender,
                this.contract,
                tokenID,
                currency,
                symbol,
                amount ?? 0,
            )
        )
    }

    mint(
        sender: string | Address,
        tokenID: string | CurrencyID,
        currency: string | CurrencyID,
        receiver: string | Address,
        amount: string | number | Big,
    ) {
        return new Operation(
            this.networkID,
            new MintFact(
                TimeStamp.new().UTC(),
                sender,
                this.contract,
                tokenID,
                currency,
                receiver,
                amount,
            )
        )
    }

    burn(
        sender: string | Address,
        tokenID: string | CurrencyID,
        currency: string | CurrencyID,
        target: string | Address,
        amount: string | number | Big,
    ) {
        return new Operation(
            this.networkID,
            new BurnFact(
                TimeStamp.new().UTC(),
                sender,
                this.contract,
                tokenID,
                currency,
                target,
                amount,
            )
        )
    }

    transfer(
        sender: string | Address,
        tokenID: string | CurrencyID,
        currency: string | CurrencyID,
        receiver: string | Address,
        amount: string | number | Big,
    ) {
        return new Operation(
            this.networkID,
            new TransferFact(
                TimeStamp.new().UTC(),
                sender,
                this.contract,
                tokenID,
                currency,
                receiver,
                amount,
            )
        )
    }

    transferFrom(
        sender: string | Address,
        tokenID: string | CurrencyID,
        currency: string | CurrencyID,
        receiver: string | Address,
        target: string | Address,
        amount: string | number | Big,
    ) {
        return new Operation(
            this.networkID,
            new TransferFromFact(
                TimeStamp.new().UTC(),
                sender,
                this.contract,
                tokenID,
                currency,
                receiver,
                target,
                amount,
            )
        )
    }

    approve(
        sender: string | Address,
        tokenID: string | CurrencyID,
        currency: string | CurrencyID,
        approved: string | Address,
        amount: string | number | Big,
    ) {
        return new Operation(
            this.networkID,
            new ApproveFact(
                TimeStamp.new().UTC(),
                sender,
                this.contract,
                tokenID,
                currency,
                approved,
                amount,
            )
        )
    }
}