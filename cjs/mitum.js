"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mitum = void 0;
const common_1 = require("./common");
const account_1 = require("./account");
const currency_1 = require("./currency");
const block_1 = require("./block");
const contract_1 = require("./contract");
const operation_1 = require("./operation");
class Mitum {
    constructor(provider) {
        this._version = new common_1.Version();
        this._node = new common_1.Node(provider);
        this._chain = new common_1.Chain();
        this.account = new account_1.Account(provider);
        this.currency = new currency_1.Currency(provider);
        this.block = new block_1.Block(provider);
        this.contract = new contract_1.Contract();
        this.operation = new operation_1.Operation(provider);
    }
    version() {
        return this._version.getVersion();
    }
    node() {
        return this._node.getNodeInfo();
    }
    setNode(provider) {
        this._node.setNode(provider);
        this.account = new account_1.Account(provider);
        this.currency = new currency_1.Currency(provider);
        this.block = new block_1.Block(provider);
        this.operation = new operation_1.Operation(provider);
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
exports.Mitum = Mitum;
exports.default = Mitum;
//# sourceMappingURL=mitum.js.map