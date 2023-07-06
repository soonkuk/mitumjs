"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsItem = void 0;
const address_js_1 = require("../../account/address.js");
const property_js_1 = require("../../types/property.js");
const item_js_1 = require("../../types/item.js");
const math_js_1 = require("../../utils/math.js");
const string_js_1 = require("../../types/string.js");
class CredentialsItem extends item_js_1.Item {
    constructor(hint, contract, credentialServiceID, holder, templateID, id, currency) {
        super(hint);
        this.contract = new address_js_1.Address(contract);
        this.credentialServiceID = new property_js_1.ContractID(credentialServiceID);
        this.holder = new address_js_1.Address(holder);
        this.templateID = new math_js_1.Big(templateID);
        this.id = new string_js_1.String(id);
        this.currency = new property_js_1.CurrencyID(currency);
    }
    toBuffer() {
        return Buffer.concat([
            this.contract.toBuffer(),
            this.credentialServiceID.toBuffer(),
            this.holder.toBuffer(),
            this.templateID.toBuffer("fill"),
            this.id.toBuffer(),
        ]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { contract: this.contract.toString(), credentialServiceID: this.credentialServiceID.toString(), holder: this.holder.toString(), templateID: this.templateID.v, id: this.id.toString(), currency: this.currency.toString() });
    }
    toString() {
        return this.id.toString();
    }
}
exports.CredentialsItem = CredentialsItem;
//# sourceMappingURL=item.js.map