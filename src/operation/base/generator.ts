import { Address } from "../../key"
import { Generator, IP } from "../../types"

export abstract class ContractGenerator extends Generator {
    protected _contract: Address | undefined

    constructor(
        networkID: string,
        contract?: string | Address,
        api?: string | IP,
    ) {
        super(networkID, api)
        this._contract = contract ? Address.from(contract) : undefined
    }

    /**
     * @deprecated use setContract(contract: string | Address)
     */
    setContractAddress(contract: string | Address) {
        this.setContract(contract)
    }

    setContract(contract: string | Address) {
        this._contract = Address.from(contract)
    }

    get contract() {
        return this._contract ? this._contract.toString() : ""
    }
}