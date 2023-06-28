import { MitumError, Assert, ECODE } from "../../utils/error.js";
import { OperationFact } from "../../types/fact.js";
import { HINT_NFT } from "../../types/hintNft.js";
import { Address } from "../../account/address.js";
import { NFTItem } from "./item.js";
export class DelegateItem extends NFTItem {
    constructor(contract, collection, operator, mode, currency) {
        super(HINT_NFT.HINT_DELEGATE_ITEM, contract, collection, currency);
        Assert.check(contract.toString() !== operator, MitumError.detail(ECODE.INVALID_ITEM, "The contract address is the same as the operator address."));
        Assert.check(mode === "allow" || mode === "cancel", MitumError.detail(ECODE.INVALID_ITEM, "The value of 'mode' must be one of 'allow' or 'cancel'."));
        this.operator = new Address(operator);
        this.mode = mode;
    }
    toBuffer() {
        return Buffer.concat([
            super.toBuffer(),
            this.operator.toBuffer(),
            Buffer.from(this.mode),
            this.currency.toBuffer(),
        ]);
    }
    toHintedObject() {
        return {
            ...super.toHintedObject(),
            operator: this.operator.toString,
            mode: this.mode,
        };
    }
    toString() {
        return (this.contract.toString() +
            this.collection.toString() +
            this.operator.toString());
    }
}
export class DelegateFact extends OperationFact {
    constructor(token, sender, items) {
        super(HINT_NFT.HINT_DELEGATE_OPERATION_FACT, token, sender, items);
        Assert.check(new Set(items.map((it) => it.toString())).size === items.length, MitumError.detail(ECODE.INVALID_ITEMS, "A duplicate item exists"));
        items.forEach((item) => {
            Assert.check(item instanceof DelegateItem, MitumError.detail(ECODE.INVALID_ITEMS, "An invalidly formatted item exists."));
            Assert.check(item.contract.toString() !== sender, MitumError.detail(ECODE.INVALID_ITEMS, "The contract address is the same as the sender address."));
        });
    }
    get operationHint() {
        return HINT_NFT.HINT_DELEGATE_OPERATION;
    }
}
//# sourceMappingURL=delegate.js.map