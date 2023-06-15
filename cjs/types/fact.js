"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeFact = exports.OperationFact = exports.Fact = void 0;
const bs58_1 = __importDefault(require("bs58"));
const address_1 = require("../account/address");
const property_1 = require("./property");
const config_1 = require("../utils/config");
const math_1 = require("../utils/math");
const error_1 = require("../utils/error");
class Fact {
    constructor(hint, token) {
        this.hint = new property_1.Hint(hint);
        this.token = new property_1.Token(token);
        this._hash = Buffer.from([]);
    }
    get hash() {
        return this._hash;
    }
    hashing() {
        return (0, math_1.sha3)(this.toBuffer());
    }
    toBuffer() {
        return this.token.toBuffer();
    }
    toHintedObject() {
        return {
            _hint: this.hint.toString(),
            hash: bs58_1.default.encode(this.hash ? this.hash : []),
            token: this.token.toString(),
        };
    }
}
exports.Fact = Fact;
class OperationFact extends Fact {
    constructor(hint, token, sender, items) {
        super(hint, token);
        this.sender = address_1.Address.from(sender);
        error_1.Assert.check(config_1.MitumConfig.ITEMS_IN_FACT.satisfy(items.length));
        error_1.Assert.check(new Set(items.map((i) => i.toString())).size === items.length, error_1.MitumError.detail(error_1.ECODE.INVALID_ITEMS, "duplicate items found"));
        this.items = items;
        this._hash = this.hashing();
    }
    toBuffer() {
        return Buffer.concat([
            super.toBuffer(),
            this.sender.toBuffer(),
            Buffer.concat(this.items.sort(math_1.SortFunc).map((i) => i.toBuffer())),
        ]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { sender: this.sender.toString(), items: this.items.sort(math_1.SortFunc).map((i) => i.toHintedObject()) });
    }
}
exports.OperationFact = OperationFact;
class NodeFact extends Fact {
    constructor(hint, token) {
        super(hint, token);
    }
}
exports.NodeFact = NodeFact;
//# sourceMappingURL=fact.js.map