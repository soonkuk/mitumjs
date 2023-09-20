import { Generator, IP } from "./types"

import { Block, Node, NetworkID } from "./node"
import { 
    Account, Currency, Contract, 
    NFT,
    DAO, KYC, STO,
    TimeStamp, Credential,
    Operation,
} from "./operation"

export default class Mitum extends Generator {
    private _node: Node

    public account: Account
    public currency: Currency
    public contract: Contract
    public block: Block
    public operation: Operation

    public nft: NFT
    public credential: Credential
    public timestamp: TimeStamp
    public sto: STO
    public kyc: KYC
    public dao: DAO

    public constructor(api?: string) {
        super(NetworkID.get(), api)

        this._node = new Node(api)

        this.account = new Account(this.networkID, this.api)
        this.currency = new Currency(this.networkID, this.api)
        this.block = new Block(this.api)
        this.operation = new Operation(this.api)

        this.contract = new Contract(this.networkID, this.api)
        this.nft = new NFT(this.networkID, undefined, this.api)
        this.credential = new Credential(this.networkID, undefined, this.api)
        this.timestamp = new TimeStamp(this.networkID, undefined, this.api)
        this.sto = new STO(this.networkID, undefined, this.api)
        this.kyc = new KYC(this.networkID, undefined, this.api)
        this.dao = new DAO(this.networkID, undefined, this.api)
    }

    async node() {
        return await this._node.getNodeInfo()
    }

    /**
     * @deprecated use setAPI(api?: string | IP)
     */
    setNode(api?: string) {
        this.setAPI(api)
    }

    setAPI(api?: string | IP) {
        super.setAPI(api)

        this.account = new Account(this.networkID, this.api)
        this.currency = new Currency(this.networkID, this.api)
        this.block = new Block(this.api)
        this.operation = new Operation(this.api)

        this.contract = new Contract(this.networkID, this.api)
        this.nft = new NFT(this.networkID, this.api)
        this.credential = new Credential(this.networkID, this.api)
        this.timestamp = new TimeStamp(this.networkID, this.api)
        this.sto = new STO(this.networkID, this.api)
        this.kyc = new KYC(this.networkID, this.api)
        this.dao = new DAO(this.networkID, this.api)
    }

    getNode(): string {
        return this.api
    }

    getChain(): string {
        return this.networkID
    }

    setChain(networkID: string) {
        super.setNetworkID(networkID)

        this.account = new Account(this.networkID, this.api)
        this.currency = new Currency(this.networkID, this.api)
        this.block = new Block(this.api)
        this.operation = new Operation(this.api)

        this.contract = new Contract(this.networkID, this.api)
        this.nft = new NFT(this.networkID, this.api)
        this.credential = new Credential(this.networkID, this.api)
        this.timestamp = new TimeStamp(this.networkID, this.api)
        this.sto = new STO(this.networkID, this.api)
        this.kyc = new KYC(this.networkID, this.api)
        this.dao = new DAO(this.networkID, this.api)
    }
}