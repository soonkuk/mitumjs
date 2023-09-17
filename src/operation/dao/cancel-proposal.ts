import { DAOFact } from "./fact"

import { HINT } from "../../alias"
import { Address } from "../../key"
import { ContractID, CurrencyID } from "../../common"

export class CancelProposalFact extends DAOFact {
    constructor(
        token: string,
        sender: string | Address,
        contract: string | Address,
        dao: string | ContractID,
        proposalID: string,
        currency: string | CurrencyID,
    ) {
        super(HINT.DAO.CANCEL_PROPOSAL.FACT, token, sender, contract, dao, proposalID, currency)
    }

    toBuffer(): Buffer {
        return Buffer.concat([
            super.toBuffer(),
            this.currency.toBuffer(),
        ])
    }

    get operationHint() {
        return HINT.DAO.CANCEL_PROPOSAL.OPERATION
    }
}