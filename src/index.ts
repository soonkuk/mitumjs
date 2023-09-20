import { Generator, IP } from "./types"

import { Block, Node, NetworkID } from "./node"
import { 
    Account, Currency, Contract, 
    NFT,
    DAO, KYC, STO,
    TimeStamp, Credential,
    Token,
    Operation,
} from "./operation"

export default class Mitum extends Generator {
    private _node: Node

    private _account: Account
    private _currency: Currency
    private _contract: Contract
    private _block: Block
    private _operation: Operation

    private _nft: NFT
    private _credential: Credential
    private _timestamp: TimeStamp
    private _sto: STO
    private _kyc: KYC
    private _dao: DAO
    private _token: Token

    public constructor(api?: string) {
        super(NetworkID.get(), api)
        this._node = new Node(this.api)

        this._account = new Account(this.networkID,this. api)
        this._currency = new Currency(this.networkID, this.api)
        this._block = new Block(this.api)
        this._operation = new Operation(this.networkID, this.api)

        this._contract = new Contract(this.networkID, this.api)
        this._nft = new NFT(this.networkID, undefined, this.api)
        this._credential = new Credential(this.networkID, undefined, this.api)
        this._timestamp = new TimeStamp(this.networkID, undefined, this.api)
        this._sto = new STO(this.networkID, undefined, this.api)
        this._kyc = new KYC(this.networkID, undefined, this.api)
        this._dao = new DAO(this.networkID, undefined, this.api)
        this._token = new Token(this.networkID, undefined, this.api)
    }

    private refresh() {
        this._node = new Node(this.api)

        this._account = new Account(this.networkID,this. api)
        this._currency = new Currency(this.networkID, this.api)
        this._block = new Block(this.api)
        this._operation = new Operation(this.networkID, this.api)

        this._contract = new Contract(this.networkID, this.api)
        this._nft = new NFT(this.networkID, this._nft.contract, this.api)
        this._credential = new Credential(this.networkID, this._credential.contract, this.api)
        this._timestamp = new TimeStamp(this.networkID, this._timestamp.contract, this.api)
        this._sto = new STO(this.networkID, this._sto.contract, this.api)
        this._kyc = new KYC(this.networkID, this._kyc.contract, this.api)
        this._dao = new DAO(this.networkID, this._dao.contract, this.api)
        this._token = new Token(this.networkID, this._token.contract, this.api)
    }

    get node(): Node {
        return this._node
    }

    get account(): Account {
        return this._account
    }

    get currency(): Currency {
        return this._currency
    }

    get block(): Block {
        return this._block
    }

    get operation(): Operation {
        return this._operation
    }

    get contract(): Contract {
        return this._contract
    }

    get nft(): NFT {
        return this._nft
    }

    get credential(): Credential {
        return this._credential
    }

    get timestamp(): TimeStamp {
        return this._timestamp
    }

    get sto(): STO {
        return this._sto
    }

    get kyc(): KYC {
        return this._kyc
    }

    get dao(): DAO {
        return this._dao
    }

    get token(): Token {
        return this._token
    }

    /**
     * @deprecated use setAPI(api?: string | IP)
     */
    setNode(api?: string) {
        this.setAPI(api)
    }

    setAPI(api?: string | IP) {
        super.setAPI(api)
        this.refresh()
    }

    /**
     * @deprecated use .api (get)
     */
    getNode(): string {
        return this.api.toString()
    }

    getAPI(): string {
        return this.api.toString()
    }

    getChain(): string {
        return this.networkID
    }

    setChain(networkID: string) {
        super.setNetworkID(networkID)
        this.refresh()
    }
}