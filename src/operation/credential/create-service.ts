import { CredentialFact } from "./fact"

import { HINT } from "../../alias"
import { Address } from "../../key"
import { ContractID, CurrencyID } from "../../common"

export class CreateServiceFact extends CredentialFact {
    constructor(
        token: string, 
        sender: string | Address, 
        contract: string | Address, 
        service: string | ContractID,
        currency: string | CurrencyID,
    ) {
        super(HINT.CREDENTIAL.CREATE_SERVICE.FACT, token, sender, contract, service, currency)
    }

    get operationHint() {
        return HINT.CREDENTIAL.CREATE_SERVICE.OPERATION
    }
}