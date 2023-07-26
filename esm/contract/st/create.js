import { Assert, MitumError, ECODE } from "../../utils/error.js";
import { OperationFact } from "../../types/fact.js";
import { SortFunc } from "../../utils/math.js";
import { Big } from "../../utils/math.js";
import { Address } from "../../account/address.js";
import { Partition } from "./partition.js";
import { STItem } from "./item.js";
const CreateSecurityTokensItemHint = "mitum-sto-create-security-tokens-item";
const CreateSecurityTokensFactHint = "mitum-sto-create-security-tokens-operation-fact";
const CreateSecurityTokensHint = "mitum-sto-create-security-tokenss-operation";
const MaxCreateSecurityTokensItems = 20;
export class CreateSecurityTokensItem extends STItem {
    constructor(contract, serviceID, granularity, defaultPartition, controllers, currency) {
        super(CreateSecurityTokensItemHint, contract, serviceID, currency);
        this.granularity = new Big(granularity);
        this.defaultPartition = new Partition(defaultPartition);
        const cSet = new Set(controllers);
        Assert.check(cSet.size === controllers.length, MitumError.detail(ECODE.INVALID_PARAMETER, "There are duplicate elements in controllers."));
        this.controllers = controllers.map((c) => new Address(c));
    }
    toBuffer() {
        return Buffer.concat([
            super.toBuffer(),
            this.granularity.toBuffer("fill"),
            this.defaultPartition.toBuffer(),
            Buffer.concat(this.controllers.sort(SortFunc).map((c) => c.toBuffer())),
            this.currency.toBuffer(),
        ]);
    }
    toString() {
        return this.defaultPartition.toString();
    }
    toHintedObject() {
        return {
            ...super.toHintedObject(),
            granularity: this.granularity.v,
            default_partition: this.defaultPartition.toString(),
            controllers: this.controllers.sort(SortFunc).map((c) => c.toString()),
        };
    }
}
export class CreateSecurityTokensFact extends OperationFact {
    constructor(token, sender, items) {
        super(CreateSecurityTokensFactHint, token, sender, items);
        items.forEach((item) => {
            Assert.check(item instanceof CreateSecurityTokensItem, MitumError.detail(ECODE.INVALID_PARAMETER, "The type of items is incorrect."));
            Assert.check(item.contract.toString() !== sender, MitumError.detail(ECODE.INVALID_PARAMETER, "The contract address is the same as the sender address."));
        });
        Assert.check(items.length <= MaxCreateSecurityTokensItems, MitumError.detail(ECODE.INVALID_PARAMETER, "The number of elements in items is too many."));
        const iSet = new Set(items.map((item) => item.toString()));
        Assert.check(iSet.size === items.length, MitumError.detail(ECODE.INVALID_PARAMETER, "There are duplicate elements in items."));
    }
    get operationHint() {
        return CreateSecurityTokensHint;
    }
}
//# sourceMappingURL=create.js.map