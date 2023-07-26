"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferSecurityTokensPartitionFact = exports.TransferSecurityTokensPartitionItem = void 0;
const error_js_1 = require("../../utils/error.js");
const fact_js_1 = require("../../types/fact.js");
const math_js_1 = require("../../utils/math.js");
const address_js_1 = require("../../account/address.js");
const partition_js_1 = require("./partition.js");
const item_js_1 = require("./item.js");
const TransferSecurityTokensPartitionItemHint = "mitum-sto-transfer-security-tokens-partition-item";
const TransferSecurityTokensPartitionFactHint = "mitum-sto-transfer-security-tokens-partition-operation-fact";
const TransferSecurityTokensPartitionHint = "mitum-sto-transfer-security-tokens-partition-operation";
const MaxTransferSecurityTokensPartitionItems = 20;
class TransferSecurityTokensPartitionItem extends item_js_1.STItem {
    constructor(contract, serviceID, tokenholder, receiver, partition, amount, currency) {
        super(TransferSecurityTokensPartitionItemHint, contract, serviceID, currency);
        this.tokenholder = new address_js_1.Address(tokenholder);
        this.receiver = new address_js_1.Address(receiver);
        this.amount = new math_js_1.Big(amount);
        this.partition = new partition_js_1.Partition(partition);
    }
    toBuffer() {
        return Buffer.concat([
            super.toBuffer(),
            this.tokenholder.toBuffer(),
            this.receiver.toBuffer(),
            this.partition.toBuffer(),
            this.amount.toBuffer("fill"),
            this.currency.toBuffer(),
        ]);
    }
    toString() {
        return this.receiver.toString();
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { tokenholder: this.tokenholder.toString(), receiver: this.receiver.toString(), partition: this.partition.toString(), amount: this.amount.toString() });
    }
}
exports.TransferSecurityTokensPartitionItem = TransferSecurityTokensPartitionItem;
class TransferSecurityTokensPartitionFact extends fact_js_1.OperationFact {
    constructor(token, sender, items) {
        super(TransferSecurityTokensPartitionFactHint, token, sender, items);
        items.forEach((item) => {
            error_js_1.Assert.check(item instanceof TransferSecurityTokensPartitionItem, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The type of items is incorrect."));
            error_js_1.Assert.check(item.contract.toString() !== sender, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The contract address is the same as the sender address."));
        });
        error_js_1.Assert.check(items.length <= MaxTransferSecurityTokensPartitionItems, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The number of elements in items is too many."));
        const iSet = new Set(items.map((item) => item.toString()));
        error_js_1.Assert.check(iSet.size === items.length, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "There are duplicate elements in items."));
    }
    get operationHint() {
        return TransferSecurityTokensPartitionHint;
    }
}
exports.TransferSecurityTokensPartitionFact = TransferSecurityTokensPartitionFact;
//# sourceMappingURL=transfer.js.map