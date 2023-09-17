import { DAOFact } from "./fact"

import { HINT } from "../../alias"
import { Address } from "../../key"
import { ContractID, CurrencyID } from "../../common"
import { Assert, ECODE, MitumError } from "../../error"
import { FactJson } from "../base"

export class RegisterFact extends DAOFact {
    readonly delegated: Address

    constructor(
        token: string,
        sender: string | Address,
        contract: string | Address,
        dao: string | ContractID,
        proposalID: string,
        delegated: string | Address,
        currency: string | CurrencyID,
    ) {
        super(HINT.DAO.REGISTER.FACT, token, sender, contract, dao, proposalID, currency)
        
        this.delegated = Address.from(delegated)

        Assert.check(
            this.contract.toString() !== this.delegated.toString(),
            MitumError.detail(ECODE.INVALID_FACT, "contract is same with delegated address")
        )
    }

    toBuffer(): Buffer {
        return Buffer.concat([
            super.toBuffer(),
            this.delegated.toBuffer(),
            this.currency.toBuffer(),
        ])
    }

    toHintedObject(): FactJson {
        return {
            ...super.toHintedObject(),
            delegated: this.delegated.toString(),
        }
    }

    get operationHint() {
        return HINT.DAO.REGISTER.OPERATION
    }
}