"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeOperatorsFact = exports.AuthorizeOperatorsItem = void 0;
const error_js_1 = require("../../utils/error.js");
const fact_js_1 = require("../../types/fact.js");
const item_js_1 = require("./item.js");
const address_js_1 = require("../../account/address.js");
const partition_js_1 = require("./partition.js");
const AuthorizeOperatorsItemHint = "mitum-sto-authorize-operators-item";
const AuthorizeOperatorsFactHint = "mitum-sto-authorize-operator-operation-fact";
const AuthorizeOperatorsHint = "mitum-sto-authorize-operator-operation";
const MaxAuthorizeOperatorsItems = 20;
class AuthorizeOperatorsItem extends item_js_1.STItem {
    constructor(contract, serviceID, operator, partition, currency) {
        super(AuthorizeOperatorsItemHint, contract, serviceID, currency);
        this.operator = new address_js_1.Address(operator);
        this.partition = new partition_js_1.Partition(partition);
    }
    toBuffer() {
        return Buffer.concat([
            super.toBuffer(),
            this.operator.toBuffer(),
            this.partition.toBuffer(),
            this.currency.toBuffer(),
        ]);
    }
    toString() {
        return this.operator.toString();
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { operator: this.operator.toString(), partition: this.partition.toString() });
    }
}
exports.AuthorizeOperatorsItem = AuthorizeOperatorsItem;
class AuthorizeOperatorsFact extends fact_js_1.OperationFact {
    constructor(token, sender, items) {
        super(AuthorizeOperatorsFactHint, token, sender, items);
        items.forEach((item) => {
            error_js_1.Assert.check(item instanceof AuthorizeOperatorsItem, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The type of items is incorrect."));
            error_js_1.Assert.check(item.contract.toString() !== sender, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The contract address is the same as the sender address."));
        });
        error_js_1.Assert.check(items.length <= MaxAuthorizeOperatorsItems, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The number of elements in items is too many."));
        const iSet = new Set(items.map((item) => item.toString()));
        error_js_1.Assert.check(iSet.size === items.length, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "There are duplicate elements in items."));
    }
    get operationHint() {
        return AuthorizeOperatorsHint;
    }
}
exports.AuthorizeOperatorsFact = AuthorizeOperatorsFact;
//# sourceMappingURL=authorize.js.map