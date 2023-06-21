import base58 from "bs58";
import { Address } from "../account/address";
import { Hint, Token } from "./property";
import { MitumConfig } from "../utils/config";
import { SortFunc, sha3 } from "../utils/math";
import { Assert, ECODE, MitumError } from "../utils/error";
export class Fact {
    constructor(hint, token) {
        this.hint = new Hint(hint);
        this.token = new Token(token);
        this._hash = Buffer.from([]);
    }
    get hash() {
        return this._hash;
    }
    hashing() {
        return sha3(this.toBuffer());
    }
    toBuffer() {
        return this.token.toBuffer();
    }
    toHintedObject() {
        return {
            _hint: this.hint.toString(),
            hash: base58.encode(this.hash ? this.hash : []),
            token: this.token.toString(),
        };
    }
}
export class OperationFact extends Fact {
    constructor(hint, token, sender, items) {
        super(hint, token);
        this.sender = Address.from(sender);
        Assert.check(MitumConfig.ITEMS_IN_FACT.satisfy(items.length));
        Assert.check(new Set(items.map((i) => i.toString())).size === items.length, MitumError.detail(ECODE.INVALID_ITEMS, "duplicate items found"));
        this.items = items;
        this._hash = this.hashing();
    }
    toBuffer() {
        return Buffer.concat([
            super.toBuffer(),
            this.sender.toBuffer(),
            Buffer.concat(this.items.sort(SortFunc).map((i) => i.toBuffer())),
        ]);
    }
    toHintedObject() {
        return {
            ...super.toHintedObject(),
            sender: this.sender.toString(),
            items: this.items.sort(SortFunc).map((i) => i.toHintedObject()),
        };
    }
}
export class NodeFact extends Fact {
    constructor(hint, token) {
        super(hint, token);
    }
}
//# sourceMappingURL=fact.js.map