"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedeemTokensFact = exports.RedeemTokensItem = void 0;
const error_js_1 = require("../../utils/error.js");
const fact_js_1 = require("../../types/fact.js");
const math_js_1 = require("../../utils/math.js");
const address_js_1 = require("../../account/address.js");
const partition_js_1 = require("./partition.js");
const item_js_1 = require("./item.js");
const RedeemTokensItemHint = "mitum-sto-redeem-tokens-item";
const RedeemTokensFactHint = "mitum-sto-redeem-tokens-operation-fact";
const RedeemTokensHint = "mitum-sto-redeem-tokens-operation";
const MaxRedeemSecurityTokensItems = 20;
class RedeemTokensItem extends item_js_1.STItem {
    constructor(contract, serviceID, tokenHolder, amount, partition, currency) {
        super(RedeemTokensItemHint, contract, serviceID, currency);
        this.tokenHolder = new address_js_1.Address(tokenHolder);
        this.amount = new math_js_1.Big(amount);
        this.partition = new partition_js_1.Partition(partition);
    }
    toBuffer() {
        return Buffer.concat([
            super.toBuffer(),
            this.tokenHolder.toBuffer(),
            this.amount.toBuffer("fill"),
            this.partition.toBuffer(),
            this.currency.toBuffer(),
        ]);
    }
    toString() {
        return this.tokenHolder.toString();
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { receiver: this.tokenHolder.toString(), amount: this.amount.toString(), partition: this.partition.toString() });
    }
}
exports.RedeemTokensItem = RedeemTokensItem;
class RedeemTokensFact extends fact_js_1.OperationFact {
    constructor(token, sender, items) {
        super(RedeemTokensFactHint, token, sender, items);
        items.forEach((item) => {
            error_js_1.Assert.check(item instanceof RedeemTokensItem, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The type of items is incorrect."));
            error_js_1.Assert.check(item.contract.toString() !== sender, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The contract address is the same as the sender address."));
        });
        error_js_1.Assert.check(items.length <= MaxRedeemSecurityTokensItems, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The number of elements in items is too many."));
        const iSet = new Set(items.map((item) => item.toString()));
        error_js_1.Assert.check(iSet.size === items.length, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "There are duplicate elements in items."));
    }
    get operationHint() {
        return RedeemTokensHint;
    }
}
exports.RedeemTokensFact = RedeemTokensFact;
//# sourceMappingURL=redeem.js.map