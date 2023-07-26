"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSecurityTokensFact = exports.CreateSecurityTokensItem = void 0;
const error_js_1 = require("../../utils/error.js");
const fact_js_1 = require("../../types/fact.js");
const math_js_1 = require("../../utils/math.js");
const math_js_2 = require("../../utils/math.js");
const address_js_1 = require("../../account/address.js");
const partition_js_1 = require("./partition.js");
const item_js_1 = require("./item.js");
const CreateSecurityTokensItemHint = "mitum-sto-create-security-tokens-item";
const CreateSecurityTokensFactHint = "mitum-sto-create-security-tokens-operation-fact";
const CreateSecurityTokensHint = "mitum-sto-create-security-tokenss-operation";
const MaxCreateSecurityTokensItems = 20;
class CreateSecurityTokensItem extends item_js_1.STItem {
    constructor(contract, serviceID, granularity, defaultPartition, controllers, currency) {
        super(CreateSecurityTokensItemHint, contract, serviceID, currency);
        this.granularity = new math_js_2.Big(granularity);
        this.defaultPartition = new partition_js_1.Partition(defaultPartition);
        const cSet = new Set(controllers);
        error_js_1.Assert.check(cSet.size === controllers.length, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "There are duplicate elements in controllers."));
        this.controllers = controllers.map((c) => new address_js_1.Address(c));
    }
    toBuffer() {
        return Buffer.concat([
            super.toBuffer(),
            this.granularity.toBuffer("fill"),
            this.defaultPartition.toBuffer(),
            Buffer.concat(this.controllers.sort(math_js_1.SortFunc).map((c) => c.toBuffer())),
            this.currency.toBuffer(),
        ]);
    }
    toString() {
        return this.defaultPartition.toString();
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { granularity: this.granularity.v, default_partition: this.defaultPartition.toString(), controllers: this.controllers.sort(math_js_1.SortFunc).map((c) => c.toString()) });
    }
}
exports.CreateSecurityTokensItem = CreateSecurityTokensItem;
class CreateSecurityTokensFact extends fact_js_1.OperationFact {
    constructor(token, sender, items) {
        super(CreateSecurityTokensFactHint, token, sender, items);
        items.forEach((item) => {
            error_js_1.Assert.check(item instanceof CreateSecurityTokensItem, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The type of items is incorrect."));
            error_js_1.Assert.check(item.contract.toString() !== sender, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The contract address is the same as the sender address."));
        });
        error_js_1.Assert.check(items.length <= MaxCreateSecurityTokensItems, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The number of elements in items is too many."));
        const iSet = new Set(items.map((item) => item.toString()));
        error_js_1.Assert.check(iSet.size === items.length, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "There are duplicate elements in items."));
    }
    get operationHint() {
        return CreateSecurityTokensHint;
    }
}
exports.CreateSecurityTokensFact = CreateSecurityTokensFact;
//# sourceMappingURL=create.js.map