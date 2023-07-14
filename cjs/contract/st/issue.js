"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueSecurityTokensFact = exports.IssueSecurityTokensItem = void 0;
const error_js_1 = require("../../utils/error.js");
const fact_js_1 = require("../../types/fact.js");
const math_js_1 = require("../../utils/math.js");
const address_js_1 = require("../../account/address.js");
const partition_js_1 = require("./partition.js");
const item_js_1 = require("./item.js");
const IssueSecurityTokensItemHint = "mitum-sto-issue-security-tokens-item";
const IssueSecurityTokensFactHint = "mitum-sto-issue-security-tokens-operation-fact";
const IssueSecurityTokensHint = "mitum-sto-issue-security-tokens-operation";
const MaxIssueSecurityTokensItems = 10;
class IssueSecurityTokensItem extends item_js_1.STItem {
    constructor(contract, serviceID, receiver, amount, partition, currency) {
        super(IssueSecurityTokensItemHint, contract, serviceID, currency);
        this.receiver = new address_js_1.Address(receiver);
        this.amount = new math_js_1.Big(amount);
        this.partition = new partition_js_1.Partition(partition);
    }
    toBuffer() {
        return Buffer.concat([
            super.toBuffer(),
            this.receiver.toBuffer(),
            this.amount.toBuffer("fill"),
            this.partition.toBuffer(),
            this.currency.toBuffer(),
        ]);
    }
    toString() {
        return this.receiver.toString();
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { receiver: this.receiver.toString(), amount: this.amount.toString(), partition: this.partition.toString() });
    }
}
exports.IssueSecurityTokensItem = IssueSecurityTokensItem;
class IssueSecurityTokensFact extends fact_js_1.OperationFact {
    constructor(token, sender, items) {
        super(IssueSecurityTokensFactHint, token, sender, items);
        items.forEach((item) => {
            error_js_1.Assert.check(item instanceof IssueSecurityTokensItem, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The type of items is incorrect."));
            error_js_1.Assert.check(item.contract.toString() !== sender, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The contract address is the same as the sender address."));
        });
        error_js_1.Assert.check(items.length <= MaxIssueSecurityTokensItems, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The number of elements in items is too many."));
        const iSet = new Set(items.map((item) => item.toString()));
        error_js_1.Assert.check(iSet.size === items.length, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "There are duplicate elements in items."));
    }
    get operationHint() {
        return IssueSecurityTokensHint;
    }
}
exports.IssueSecurityTokensFact = IssueSecurityTokensFact;
//# sourceMappingURL=issue.js.map