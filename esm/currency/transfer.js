import { Assert, ECODE, MitumError } from "../utils/error.js";
import { SortFunc } from "../utils/math.js";
import { OperationFact } from "../types/fact.js";
import { HINT, SUFFIX } from "../types/hint.js";
import { Address, ZeroAddress } from "../account/address.js";
import { CurrencyItem } from "./currencyItem.js";
export class TransfersItem extends CurrencyItem {
    constructor(receiver, amounts) {
        super(HINT.TRANSFERS_ITEM, amounts);
        if (typeof receiver === "string") {
            if (receiver.endsWith(SUFFIX.ZERO_ADDRESS)) {
                this.receiver = new ZeroAddress(receiver);
            }
            else {
                this.receiver = new Address(receiver);
            }
        }
        else {
            this.receiver = receiver;
        }
        if (this.receiver.type === "zero") {
            for (const am of amounts) {
                Assert.check(am.currency.equal(this.receiver.currency), MitumError.detail(ECODE.INVALID_AMOUNT, "invalid amount currency for given zero address"));
            }
        }
    }
    toBuffer() {
        return Buffer.concat([
            this.receiver.toBuffer(),
            Buffer.concat(this.amounts.sort(SortFunc).map((am) => am.toBuffer())),
        ]);
    }
    toHintedObject() {
        return {
            ...super.toHintedObject(),
            receiver: this.receiver.toString(),
        };
    }
    toString() {
        return this.receiver.toString();
    }
}
export class TransfersFact extends OperationFact {
    constructor(token, sender, items) {
        super(HINT.TRANSFERS_OPERATION_FACT, token, sender, items);
        Assert.check(new Set(items.map((it) => it.toString())).size === items.length, MitumError.detail(ECODE.INVALID_ITEMS, "duplicate receiver found in items"));
    }
    get operationHint() {
        return HINT.TRANSFERS_OPERATION;
    }
}
//# sourceMappingURL=transfer.js.map