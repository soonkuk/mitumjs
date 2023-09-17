import { ContractFact, FactJson } from "../base"

import { Address } from "../../key"
import { ContractID, CurrencyID } from "../../common"
import { Assert, ECODE, MitumError } from "../../error"

export abstract class DAOFact extends ContractFact {
    readonly dao: ContractID
    readonly proposalID: string

    constructor(
        hint: string,
        token: string,
        sender: string | Address,
        contract: string | Address,
        dao: string | ContractID,
        proposalID: string, 
        currency: string | CurrencyID,
    ) {
        super(hint, token, sender, contract, currency)
        
        this.dao = ContractID.from(dao)
        this.proposalID = proposalID

        Assert.check(
            this.proposalID !== "",
            MitumError.detail(ECODE.INVALID_FACT, "empty proposal id"),
        )

        this._hash = this.hashing()
    }

    toBuffer(): Buffer {
        return Buffer.concat([
            super.toBuffer(),
            this.dao.toBuffer(),
            Buffer.from(this.proposalID),
        ])
    }

    toHintedObject(): FactJson {
        return {
            ...super.toHintedObject(),
            dao_id: this.dao.toString(),
            proposal_id: this.proposalID,
        }
    }
}