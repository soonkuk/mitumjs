"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountsItem = exports.CreateAccountsFact = void 0;
const bs58_1 = __importDefault(require("bs58"));
const error_1 = require("../utils/error");
const math_1 = require("../utils/math");
const currencyItem_1 = require("../currency/currencyItem");
const fact_1 = require("../types/fact");
const hint_1 = require("../types/hint");
class CreateAccountsFact extends fact_1.OperationFact {
    constructor(token, sender, items) {
        super(hint_1.HINT.CREATE_ACCOUNTS_OPERATION_FACT, token, sender, items);
        error_1.Assert.check(new Set(items.map((it) => it.addressType !== "")).size === 1, error_1.MitumError.detail(error_1.ECODE.INVALID_ITEMS, "not unified mitum versions of items"));
        error_1.Assert.check(new Set(items.map((it) => it.toString())).size === items.length, error_1.MitumError.detail(error_1.ECODE.INVALID_ITEMS, "duplicate key hash found in items"));
    }
    get operationHint() {
        return hint_1.HINT.CREATE_ACCOUNTS_OPERATION;
    }
}
exports.CreateAccountsFact = CreateAccountsFact;
class CreateAccountsItem extends currencyItem_1.CurrencyItem {
    constructor(keys, amounts, addressType) {
        super(hint_1.HINT.CREATE_ACCOUNTS_ITEM, amounts, addressType);
        this.keys = keys;
        if (addressType === "btc") {
            this.addressSuffix = hint_1.SUFFIX.ACCOUNT_ADDRESS;
        }
        else if (addressType === "ether") {
            this.addressSuffix = hint_1.SUFFIX.ETHER_ACCOUNT_ADDRESS;
        }
        else {
            this.addressSuffix = "";
        }
    }
    toBuffer() {
        return Buffer.concat([
            this.keys.toBuffer(),
            Buffer.from(this.addressSuffix),
            Buffer.concat(this.amounts.sort(math_1.SortFunc).map((am) => am.toBuffer())),
        ]);
    }
    toHintedObject() {
        const item = Object.assign(Object.assign({}, super.toHintedObject()), { keys: this.keys.toHintedObject() });
        if (this.addressSuffix) {
            return Object.assign(Object.assign({}, item), { addrtype: this.addressSuffix });
        }
        return item;
    }
    toString() {
        return bs58_1.default.encode(this.keys.toBuffer());
    }
}
exports.CreateAccountsItem = CreateAccountsItem;
//# sourceMappingURL=create.js.map