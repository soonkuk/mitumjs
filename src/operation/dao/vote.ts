import { DAOFact } from "./fact"

import { HINT } from "../../alias"
import { Address } from "../../key"
import { ContractID, CurrencyID } from "../../common"
import { Big } from "../../types"
import { FactJson } from "../base"

export class VoteFact extends DAOFact {
    readonly vote: Big

    constructor(
        token: string,
        sender: string | Address,
        contract: string | Address,
        dao: string | ContractID,
        proposalID: string,
        vote: string | number | Big,
        currency: string | CurrencyID,
    ) {
        super(HINT.DAO.VOTE.FACT, token, sender, contract, dao, proposalID, currency)
        this.vote = Big.from(vote)
    }

    toBuffer(): Buffer {
        return Buffer.concat([
            super.toBuffer(),
            this.vote.toBuffer(),
            this.currency.toBuffer(),
        ])
    }

    toHintedObject(): FactJson {
        return {
            ...super.toHintedObject(),
            vote: this.vote.v,
        }
    }

    get operationHint() {
        return HINT.DAO.VOTE.OPERATION
    }
}