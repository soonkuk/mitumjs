"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveControllersFact = exports.RemoveControllersItem = void 0;
const error_js_1 = require("../../utils/error.js");
const fact_js_1 = require("../../types/fact.js");
const address_js_1 = require("../../account/address.js");
const item_js_1 = require("./item.js");
const RemoveControllersItemHint = "mitum-kyc-remove-controllers-item";
const RemoveControllersFactHint = "mitum-kyc-remove-controllers-operation-fact";
const RemoveControllersHint = "mitum-kyc-remove-controllers-operation";
const MaxRemoveControllersItems = 10;
class RemoveControllersItem extends item_js_1.KYCItem {
    constructor(contract, serviceID, controller, currency) {
        super(RemoveControllersItemHint, contract, serviceID, currency);
        this.controller = new address_js_1.Address(controller);
    }
    toBuffer() {
        return Buffer.concat([
            super.toBuffer(),
            this.controller.toBuffer(),
            this.currency.toBuffer(),
        ]);
    }
    toString() {
        return this.controller.toString();
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { controller: this.controller.toString() });
    }
}
exports.RemoveControllersItem = RemoveControllersItem;
class RemoveControllersFact extends fact_js_1.OperationFact {
    constructor(token, sender, items) {
        super(RemoveControllersFactHint, token, sender, items);
        items.forEach((item) => {
            error_js_1.Assert.check(item instanceof RemoveControllersItem, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The type of items is incorrect."));
            error_js_1.Assert.check(item.contract.toString() !== sender, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The contract address is the same as the sender address."));
        });
        error_js_1.Assert.check(items.length <= MaxRemoveControllersItems, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The number of elements in items is too many."));
        const iSet = new Set(items.map((item) => item.toString()));
        error_js_1.Assert.check(iSet.size === items.length, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "There are duplicate elements in items."));
    }
    get operationHint() {
        return RemoveControllersHint;
    }
}
exports.RemoveControllersFact = RemoveControllersFact;
//# sourceMappingURL=remove.js.map