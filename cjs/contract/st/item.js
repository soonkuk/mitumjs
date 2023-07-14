"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STItem = void 0;
const address_js_1 = require("../../account/address.js");
const property_js_1 = require("../../types/property.js");
const item_js_1 = require("../../types/item.js");
class STItem extends item_js_1.Item {
    constructor(hint, contract, serviceId, currency) {
        super(hint);
        this.contract = new address_js_1.Address(contract);
        this.service = new property_js_1.ContractID(serviceId);
        this.currency = new property_js_1.CurrencyID(currency);
    }
    toBuffer() {
        return Buffer.concat([this.contract.toBuffer(), this.service.toBuffer()]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { contract: this.contract.toString(), stoid: this.service.toString(), currency: this.currency.toString() });
    }
}
exports.STItem = STItem;
//# sourceMappingURL=item.js.map