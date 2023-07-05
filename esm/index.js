import { MITUM_NETWORK_ID } from "./intro.js";
import { Version, Node, Chain } from "./common/index.js";
import { Account } from "./account/index.js";
import { Currency } from "./currency/index.js";
import { Block } from "./block/index.js";
import { Operation } from "./operation/index.js";
import { Contract } from "./contract/index.js";
import { Nft } from "./contract/nft/index.js";
import { Credential } from "./contract/credential/index.js";
// import { Timestamp } from "./contract/timestamp/index.js";
export class Mitum {
    // public timestamp: Timestamp;
    constructor(provider) {
        this._version = new Version();
        this._node = new Node(provider);
        this._chain = new Chain(MITUM_NETWORK_ID);
        this.account = new Account(MITUM_NETWORK_ID, provider);
        this.currency = new Currency(MITUM_NETWORK_ID, provider);
        this.block = new Block(provider);
        this.operation = new Operation(provider);
        this.contract = new Contract(MITUM_NETWORK_ID, provider);
        this.nft = new Nft(MITUM_NETWORK_ID, provider);
        this.credential = new Credential(MITUM_NETWORK_ID, provider);
        // this.timestamp = new Timestamp(provider);
    }
    version() {
        return this._version.getVersion();
    }
    async node() {
        return await this._node.getNodeInfo();
    }
    setNode(provider) {
        const networkID = this.chain();
        this._node.setNode(provider);
        this.account = new Account(networkID, provider);
        this.currency = new Currency(networkID, provider);
        this.block = new Block(provider);
        this.operation = new Operation(provider);
        this.contract = new Contract(networkID, provider);
        this.nft = new Nft(networkID, provider);
        this.credential = new Credential(networkID, provider);
        // this.timestamp = new Timestamp(networkID, provider);
    }
    getNode() {
        return this._node.getNodeUri();
    }
    chain() {
        return this._chain.getChainID();
    }
    setChain(networkID) {
        const provider = this.getNode();
        this._chain.setChainID(networkID);
        this.account = new Account(networkID, provider);
        this.currency = new Currency(networkID, provider);
        this.contract = new Contract(networkID, provider);
        this.nft = new Nft(networkID, provider);
        this.credential = new Credential(networkID, provider);
        // this.timestamp = new Timestamp(networkID, provider);
    }
}
export default Mitum;
//# sourceMappingURL=index.js.map