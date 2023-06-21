import { Version, Node, Chain } from "./common";
import { Account } from "./account";
import { Currency } from "./currency";
import { Block } from "./block";
import { Contract } from "./contract";
import { Operation } from "./operation";
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
    setChain(url) {
        this._chain.setChainID(url);
    }
}
export default Mitum;
//# sourceMappingURL=mitum.js.map