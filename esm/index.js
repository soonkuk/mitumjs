import { Version, Node, Chain } from "./common/index.js";
import { Account } from "./account/index.js";
import { Currency } from "./currency/index.js";
import { Block } from "./block/index.js";
import { Contract } from "./contract/index.js";
import { Operation } from "./operation/index.js";
export class Mitum {
    constructor(provider) {
        this._version = new Version();
        this._node = new Node(provider);
        this._chain = new Chain();
        this.account = new Account(provider);
        this.currency = new Currency(provider);
        this.block = new Block(provider);
        this.contract = new Contract();
        this.operation = new Operation(provider);
    }
    version() {
        return this._version.getVersion();
    }
    node() {
        return this._node.getNodeInfo();
    }
    setNode(provider) {
        this._node.setNode(provider);
        this.account = new Account(provider);
        this.currency = new Currency(provider);
        this.block = new Block(provider);
        this.operation = new Operation(provider);
    }
    getNode() {
        return this._node.getNodeUri();
    }
    chain() {
        return this._chain.getChainID();
    }
    setChain(cID) {
        this._chain.setChainID(cID);
    }
}
export default Mitum;
//# sourceMappingURL=index.js.map