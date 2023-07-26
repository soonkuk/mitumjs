import { Assert, MitumError, ECODE } from "../../utils/error.js";
import { OperationFact } from "../../types/fact.js";
import { Big } from "../../utils/math.js";
import { Address } from "../../account/address.js";
import { Partition } from "./partition.js";
import { STItem } from "./item.js";
const RedeemTokensItemHint = "mitum-sto-redeem-tokens-item";
const RedeemTokensFactHint = "mitum-sto-redeem-tokens-operation-fact";
const RedeemTokensHint = "mitum-sto-redeem-tokens-operation";
const MaxRedeemSecurityTokensItems = 20;
export class RedeemTokensItem extends STItem {
    constructor(contract, serviceID, tokenHolder, amount, partition, currency) {
        super(RedeemTokensItemHint, contract, serviceID, currency);
        this.tokenHolder = new Address(tokenHolder);
        this.amount = new Big(amount);
        this.partition = new Partition(partition);
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
        return {
            ...super.toHintedObject(),
            receiver: this.tokenHolder.toString(),
            amount: this.amount.toString(),
            partition: this.partition.toString(),
        };
    }
}
export class RedeemTokensFact extends OperationFact {
    constructor(token, sender, items) {
        super(RedeemTokensFactHint, token, sender, items);
        items.forEach((item) => {
            Assert.check(item instanceof RedeemTokensItem, MitumError.detail(ECODE.INVALID_PARAMETER, "The type of items is incorrect."));
            Assert.check(item.contract.toString() !== sender, MitumError.detail(ECODE.INVALID_PARAMETER, "The contract address is the same as the sender address."));
        });
        Assert.check(items.length <= MaxRedeemSecurityTokensItems, MitumError.detail(ECODE.INVALID_PARAMETER, "The number of elements in items is too many."));
        const iSet = new Set(items.map((item) => item.toString()));
        Assert.check(iSet.size === items.length, MitumError.detail(ECODE.INVALID_PARAMETER, "There are duplicate elements in items."));
    }
    get operationHint() {
        return RedeemTokensHint;
    }
}
//# sourceMappingURL=redeem.js.map