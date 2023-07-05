"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTItem = void 0;
const address_js_1 = require("../../account/address.js");
const property_js_1 = require("../../types/property.js");
const item_js_1 = require("../../types/item.js");
class NFTItem extends item_js_1.Item {
    constructor(hint, contract, collection, currency) {
        super(hint);
        this.contract = new address_js_1.Address(contract);
        this.collection = new property_js_1.ContractID(collection);
        this.currency = new property_js_1.CurrencyID(currency);
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