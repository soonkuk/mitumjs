import { IP } from "../../types"
import { Address } from "../../key"

export abstract class Generator {
    protected _networkID: string
    protected _node: IP | undefined

    constructor(networkID: string, node?: string | IP) {
        this._networkID = networkID
        this._node = node ? IP.from(node) : undefined
    }

    setNetworkID(networkID: string) {
        this._networkID = networkID
    }

    setNode(node?: string | IP) {
        this._node = node ? IP.from(node) : undefined
    }

    get networkID() {
        return this._networkID
    }

    get node() {
        return this._node ? this._node.toString() : ""
    }
}

export abstract class ContractGenerator extends Generator {
    protected _contract: Address | undefined

    constructor(
        networkID: string,
        contract?: string | Address,
        node?: string | IP,
    ) {
        super(networkID, node)
        this._contract = contract ? Address.from(contract) : undefined
    }

    setContractAddress(contract: string | Address) {
        this._contract = Address.from(contract)
    }

    get contract() {
        return this._contract ? this._contract.toString() : ""
    }
}