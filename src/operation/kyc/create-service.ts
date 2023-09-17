import { KYCFact } from "./fact"

import { HINT } from "../../alias"
import { Address } from "../../key"
import { ContractID, CurrencyID } from "../../common"

export class CreateServiceFact extends KYCFact {
    constructor(
        token: string, 
        sender: string | Address, 
        contract: string | Address, 
        service: string | ContractID,
        currency: string | CurrencyID,
    ) {
        super(HINT.KYC.CREATE_SERVICE.FACT, token, sender, contract, service, currency)
    }

    get operationHint() {
        return HINT.KYC.CREATE_SERVICE.OPERATION
    }
}