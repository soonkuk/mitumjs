"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTItem = void 0;
const item_js_1 = require("../../types/item.js");
class NFTItem extends item_js_1.Item {
    constructor(hint, contract, collection, currency) {
        super(hint);
        this.contract = contract;
        this.collection = collection;
        this.currency = currency;
    }
    toBuffer() {
        return Buffer.concat([
            this.contract.toBuffer(),
            this.collection.toBuffer(),
        ]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { contract: this.contract.toString(), collection: this.collection.toString(), currency: this.currency.toString() });
    }
}
exports.NFTItem = NFTItem;
//# sourceMappingURL=item.js.map