import { Assert, MitumError, ECODE } from "../../utils/error.js";
import { OperationFact } from "../../types/fact.js";
import { Big } from "../../utils/math.js";
import { Address } from "../../account/address.js";
import { Partition } from "./partition.js";
import { STItem } from "./item.js";
const IssueSecurityTokensItemHint = "mitum-sto-issue-security-tokens-item";
const IssueSecurityTokensFactHint = "mitum-sto-issue-security-tokens-operation-fact";
const IssueSecurityTokensHint = "mitum-sto-issue-security-tokens-operation";
const MaxIssueSecurityTokensItems = 10;
export class IssueSecurityTokensItem extends STItem {
    constructor(contract, serviceID, receiver, amount, partition, currency) {
        super(IssueSecurityTokensItemHint, contract, serviceID, currency);
        this.receiver = new Address(receiver);
        this.amount = new Big(amount);
        this.partition = new Partition(partition);
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
        return {
            ...super.toHintedObject(),
            receiver: this.receiver.toString(),
            amount: this.amount.toString(),
            partition: this.partition.toString(),
        };
    }
}
export class IssueSecurityTokensFact extends OperationFact {
    constructor(token, sender, items) {
        super(IssueSecurityTokensFactHint, token, sender, items);
        items.forEach((item) => {
            Assert.check(item instanceof IssueSecurityTokensItem, MitumError.detail(ECODE.INVALID_PARAMETER, "The type of items is incorrect."));
            Assert.check(item.contract.toString() !== sender, MitumError.detail(ECODE.INVALID_PARAMETER, "The contract address is the same as the sender address."));
        });
        Assert.check(items.length <= MaxIssueSecurityTokensItems, MitumError.detail(ECODE.INVALID_PARAMETER, "The number of elements in items is too many."));
        const iSet = new Set(items.map((item) => item.toString()));
        Assert.check(iSet.size === items.length, MitumError.detail(ECODE.INVALID_PARAMETER, "There are duplicate elements in items."));
    }
    get operationHint() {
        return IssueSecurityTokensHint;
    }
}
//# sourceMappingURL=issue.js.map