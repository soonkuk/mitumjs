"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCustomersFact = exports.AddCustomersItem = void 0;
const error_js_1 = require("../../utils/error.js");
const fact_js_1 = require("../../types/fact.js");
const boolean_js_1 = require("../../types/boolean.js");
const address_js_1 = require("../../account/address.js");
const item_js_1 = require("./item.js");
const AddCustomersItemHint = "mitum-kyc-add-customers-item";
const AddCustomersFactHint = "mitum-kyc-add-customers-operation-fact";
const AddCustomersHint = "mitum-kyc-add-customers-operation";
const MaxAddCustomersItems = 20;
class AddCustomersItem extends item_js_1.KYCItem {
    constructor(contract, serviceID, customer, status, currency) {
        super(AddCustomersItemHint, contract, serviceID, currency);
        this.customer = new address_js_1.Address(customer);
        this.status = new boolean_js_1.Boolean(status);
    }
    toBuffer() {
        return Buffer.concat([
            super.toBuffer(),
            this.customer.toBuffer(),
            this.status.toBuffer(),
            this.currency.toBuffer(),
        ]);
    }
    toString() {
        return this.customer.toString();
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { customer: this.customer.toString(), status: this.status.v });
    }
}
exports.AddCustomersItem = AddCustomersItem;
class AddCustomersFact extends fact_js_1.OperationFact {
    constructor(token, sender, items) {
        super(AddCustomersFactHint, token, sender, items);
        items.forEach((item) => {
            error_js_1.Assert.check(item instanceof AddCustomersItem, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The type of items is incorrect."));
            error_js_1.Assert.check(item.contract.toString() !== sender, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The contract address is the same as the sender address."));
        });
        error_js_1.Assert.check(items.length <= MaxAddCustomersItems, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The number of elements in items is too many."));
        const iSet = new Set(items.map((item) => item.toString()));
        error_js_1.Assert.check(iSet.size === items.length, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "There are duplicate elements in items."));
    }
    get operationHint() {
        return AddCustomersHint;
    }
}
exports.AddCustomersFact = AddCustomersFact;
//# sourceMappingURL=addCustomer.js.map