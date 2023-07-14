import { Assert, MitumError, ECODE } from "../../utils/error.js";
import { OperationFact } from "../../types/fact.js";
import { Boolean } from "../../types/boolean.js";
import { Address } from "../../account/address.js";
import { KYCItem } from "./item.js";
const UpdateCustomersItemHint = "mitum-kyc-update-customers-item";
const UpdateCustomersFactHint = "mitum-kyc-update-customers-operation-fact";
const UpdateCustomersHint = "mitum-kyc-update-customers-operation";
const MaxUpdateCustomersItems = 10;
export class UpdateCustomersItem extends KYCItem {
    constructor(contract, serviceID, customer, status, currency) {
        super(UpdateCustomersItemHint, contract, serviceID, currency);
        this.customer = new Address(customer);
        this.status = new Boolean(status);
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
        return {
            ...super.toHintedObject(),
            customer: this.customer.toString(),
            status: this.status.v,
        };
    }
}
export class UpdateCustomersFact extends OperationFact {
    constructor(token, sender, items) {
        super(UpdateCustomersFactHint, token, sender, items);
        items.forEach((item) => {
            Assert.check(item instanceof UpdateCustomersItem, MitumError.detail(ECODE.INVALID_PARAMETER, "The type of items is incorrect."));
            Assert.check(item.contract.toString() !== sender, MitumError.detail(ECODE.INVALID_PARAMETER, "The contract address is the same as the sender address."));
        });
        Assert.check(items.length <= MaxUpdateCustomersItems, MitumError.detail(ECODE.INVALID_PARAMETER, "The number of elements in items is too many."));
        const iSet = new Set(items.map((item) => item.toString()));
        Assert.check(iSet.size === items.length, MitumError.detail(ECODE.INVALID_PARAMETER, "There are duplicate elements in items."));
    }
    get operationHint() {
        return UpdateCustomersHint;
    }
}
//# sourceMappingURL=update.js.map