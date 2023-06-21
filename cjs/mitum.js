"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mitum = void 0;
const index_js_1 = require("./common/index.js");
const index_js_2 = require("./account/index.js");
const index_js_3 = require("./currency/index.js");
const index_js_4 = require("./block/index.js");
const index_js_5 = require("./contract/index.js");
const index_js_6 = require("./operation/index.js");
class Mitum {
    constructor(provider) {
        this._version = new index_js_1.Version();
        this._node = new index_js_1.Node(provider);
        this._chain = new index_js_1.Chain();
        this.account = new index_js_2.Account(provider);
        this.currency = new index_js_3.Currency(provider);
        this.block = new index_js_4.Block(provider);
        this.contract = new index_js_5.Contract();
        this.operation = new index_js_6.Operation(provider);
    }
    version() {
        return this._version.getVersion();
    }
    node() {
        return this._node.getNodeInfo();
    }
    setNode(provider) {
        this._node.setNode(provider);
        this.account = new index_js_2.Account(provider);
        this.currency = new index_js_3.Currency(provider);
        this.block = new index_js_4.Block(provider);
        this.operation = new index_js_6.Operation(provider);
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