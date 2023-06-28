"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mitum = void 0;
const index_js_1 = require("./common/index.js");
const index_js_2 = require("./account/index.js");
const index_js_3 = require("./currency/index.js");
const index_js_4 = require("./block/index.js");
const index_js_5 = require("./operation/index.js");
const index_js_6 = require("./contract/nft/index.js");
class Mitum {
    constructor(provider) {
        this._version = new index_js_1.Version();
        this._node = new index_js_1.Node(provider);
        this._chain = new index_js_1.Chain();
        this.account = new index_js_2.Account(provider);
        this.currency = new index_js_3.Currency(provider);
        this.block = new index_js_4.Block(provider);
        this.operation = new index_js_5.Operation(provider);
        this.nft = new index_js_6.Nft(provider);
    }
    version() {
        return this._version.getVersion();
    }
    node() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._node.getNodeInfo();
        });
    }
    setNode(provider) {
        this._node.setNode(provider);
        this.account = new index_js_2.Account(provider);
        this.currency = new index_js_3.Currency(provider);
        this.block = new index_js_4.Block(provider);
        this.operation = new index_js_5.Operation(provider);
        this.nft = new index_js_6.Nft(provider);
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
exports.Mitum = Mitum;
exports.default = Mitum;
//# sourceMappingURL=index.js.map