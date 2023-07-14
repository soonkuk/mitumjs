"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevokeOperatorsFact = exports.RevokeOperatorsItem = void 0;
const error_js_1 = require("../../utils/error.js");
const fact_js_1 = require("../../types/fact.js");
const item_js_1 = require("./item.js");
const address_js_1 = require("../../account/address.js");
const partition_js_1 = require("./partition.js");
const RevokeOperatorsItemHint = "mitum-sto-revoke-operators-item";
const RevokeOperatorsFactHint = "mitum-sto-revoke-operator-operation-fact";
const RevokeOperatorsHint = "mitum-sto-revoke-operator-operation";
const MaxRevokeOperatorsItems = 10;
class RevokeOperatorsItem extends item_js_1.STItem {
    constructor(contract, serviceID, operator, partition, currency) {
        super(RevokeOperatorsItemHint, contract, serviceID, currency);
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
exports.RevokeOperatorsItem = RevokeOperatorsItem;
class RevokeOperatorsFact extends fact_js_1.OperationFact {
    constructor(token, sender, items) {
        super(RevokeOperatorsFactHint, token, sender, items);
        items.forEach((item) => {
            error_js_1.Assert.check(item instanceof RevokeOperatorsItem, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The type of items is incorrect."));
            error_js_1.Assert.check(item.contract.toString() !== sender, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The contract address is the same as the sender address."));
        });
        error_js_1.Assert.check(items.length <= MaxRevokeOperatorsItems, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The number of elements in items is too many."));
        const iSet = new Set(items.map((item) => item.toString()));
        error_js_1.Assert.check(iSet.size === items.length, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "There are duplicate elements in items."));
    }
    get operationHint() {
        return RevokeOperatorsHint;
    }
}
exports.RevokeOperatorsFact = RevokeOperatorsFact;
//# sourceMappingURL=revoke.js.map