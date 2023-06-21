import base58 from "bs58";
import { Assert, ECODE, MitumError } from "../utils/error.js";
import { SortFunc } from "../utils/math.js";
import { OperationFact } from "../types/fact.js";
import { HINT, SUFFIX } from "../types/hint.js";
import { CurrencyItem } from "../currency/currencyItem.js";
export class CreateContractAccountsFact extends OperationFact {
    constructor(token, sender, items) {
        super(HINT.CREATE_CONTRACT_ACCOUNTS_OPERATION_FACT, token, sender, items);
        Assert.check(new Set(items.map((it) => it.addressType !== "")).size === 1, MitumError.detail(ECODE.INVALID_ITEMS, "not unified mitum versions of items"));
        Assert.check(new Set(items.map((it) => it.toString())).size === items.length, MitumError.detail(ECODE.INVALID_ITEMS, "duplicate key hash found in items"));
    }
    get operationHint() {
        return HINT.CREATE_CONTRACT_ACCOUNTS_OPERATION;
    }
}
export class CreateContractAccountsItem extends CurrencyItem {
    constructor(keys, amounts, addressType) {
        super(HINT.CREATE_CONTRACT_ACCOUNTS_ITEM, amounts, addressType);
        this.keys = keys;
        if (addressType === "btc") {
            this.addressSuffix = SUFFIX.ACCOUNT_ADDRESS;
        }
        else if (addressType === "ether") {
            this.addressSuffix = SUFFIX.ETHER_ACCOUNT_ADDRESS;
        }
        else {
            this.addressSuffix = "";
        }
    }
    toBuffer() {
        return Buffer.concat([
            this.keys.toBuffer(),
            Buffer.from(this.addressSuffix),
            Buffer.concat(this.amounts.sort(SortFunc).map((am) => am.toBuffer())),
        ]);
    }
    toHintedObject() {
        const item = {
            ...super.toHintedObject(),
            keys: this.keys.toHintedObject(),
        };
        if (this.addressSuffix) {
            return {
                ...item,
                addrtype: this.addressSuffix,
            };
        }
        return item;
    }
    toString() {
        return base58.encode(this.keys.toBuffer());
    }
}
//# sourceMappingURL=create.js.map