import { DAOFact } from "./fact"

import { HINT } from "../../alias"
import { Address } from "../../key"
import { ContractID, CurrencyID } from "../../common"
import { BizProposal, CryptoProposal } from "./proposal"
import { FactJson } from "../base"

export class ProposeFact extends DAOFact {
    readonly proposal: CryptoProposal | BizProposal

    constructor(
        token: string,
        sender: string | Address,
        contract: string | Address,
        dao: string | ContractID,
        proposalID: string,
        proposal: CryptoProposal | BizProposal,
        currency: string | CurrencyID,
    ) {
        super(HINT.DAO.PROPOSE.FACT, token, sender, contract, dao, proposalID, currency)
        this.proposal = proposal
    }

    toBuffer(): Buffer {
        return Buffer.concat([
            super.toBuffer(),
            this.proposal.toBuffer(),
            this.currency.toBuffer(),
        ])
    }

    toHintedObject(): FactJson {
        return {
            ...super.toHintedObject(),
            proposal: this.proposal.toHintedObject(),
        }
    }

    get operationHint() {
        return HINT.DAO.PROPOSE.OPERATION
    }
}