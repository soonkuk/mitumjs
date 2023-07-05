"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatioFeeer = exports.FixedFeeer = exports.NilFeeer = exports.CurrencyPolicy = exports.CurrencyDesign = void 0;
const property_js_1 = require("../types/property.js");
const hint_js_1 = require("../types/hint.js");
const math_js_1 = require("../utils/math.js");
const address_js_1 = require("../account/address.js");
class CurrencyDesign {
    constructor(amount, genesisAccount, policy) {
        this.amount = amount;
        this.genesisAccount = address_js_1.Address.from(genesisAccount);
        this.policy = policy;
        this.aggregate = amount.big;
    }
    toBuffer() {
        return Buffer.concat([
            this.amount.toBuffer(),
            this.genesisAccount.toBuffer(),
            this.policy.toBuffer(),
            this.aggregate.toBuffer(),
        ]);
    }
    toHintedObject() {
        return {
            _hint: CurrencyDesign.hint.toString(),
            amount: this.amount.toHintedObject(),
            genesis_account: this.genesisAccount.toString(),
            policy: this.policy.toHintedObject(),
            aggregate: this.aggregate.toString(),
        };
    }
}
exports.CurrencyDesign = CurrencyDesign;
CurrencyDesign.hint = new property_js_1.Hint(hint_js_1.HINT.CURRENCY_DESIGN);
class CurrencyPolicy {
    constructor(newAccountMinBalance, feeer) {
        this.newAccountMinBalance = math_js_1.Big.from(newAccountMinBalance);
        this.feeer = feeer;
    }
    toBuffer() {
        return Buffer.concat([
            this.newAccountMinBalance.toBuffer(),
            this.feeer.toBuffer(),
        ]);
    }
    toHintedObject() {
        return {
            _hint: CurrencyPolicy.hint.toString(),
            new_account_min_balance: this.newAccountMinBalance.toString(),
            feeer: this.feeer.toHintedObject(),
        };
    }
}
exports.CurrencyPolicy = CurrencyPolicy;
CurrencyPolicy.hint = new property_js_1.Hint(hint_js_1.HINT.CURRENCY_POLICY);
class Feeer {
    constructor(hint, exchangeMinAmount) {
        this.hint = new property_js_1.Hint(hint);
        if (exchangeMinAmount) {
            this.exchangeMinAmount =
                exchangeMinAmount instanceof math_js_1.Big
                    ? exchangeMinAmount
                    : new math_js_1.Big(exchangeMinAmount);
        }
    }
    toHintedObject() {
        return {
            _hint: this.hint.toString(),
        };
    }
}
class NilFeeer extends Feeer {
    constructor() {
        super(hint_js_1.HINT.CURRENCY_FEEER_NIL);
    }
    toBuffer() {
        return Buffer.from([]);
    }
}
exports.NilFeeer = NilFeeer;
class FixedFeeer extends Feeer {
    constructor(receiver, amount) {
        super(hint_js_1.HINT.CURRENCY_FEEER_FIXED);
        this.receiver = address_js_1.Address.from(receiver);
        this.amount = math_js_1.Big.from(amount);
    }
    toBuffer() {
        return Buffer.concat([
            this.receiver.toBuffer(),
            this.amount.toBuffer(),
            this.exchangeMinAmount
                ? this.exchangeMinAmount.toBuffer()
                : Buffer.from([]),
        ]);
    }
    toHintedObject() {
        const feeer = Object.assign(Object.assign({}, super.toHintedObject()), { receiver: this.receiver.toString(), amount: this.amount.toString() });
        if (this.exchangeMinAmount) {
            return Object.assign(Object.assign({}, feeer), { exchange_min_amount: this.exchangeMinAmount.toString() });
        }
        return feeer;
    }
}
exports.FixedFeeer = FixedFeeer;
class RatioFeeer extends Feeer {
    constructor(receiver, ratio, min, max) {
        super(hint_js_1.HINT.CURRENCY_FEEER_RATIO);
        this.receiver = address_js_1.Address.from(receiver);
        this.ratio = new math_js_1.Float(ratio);
        this.min = min instanceof math_js_1.Big ? min : new math_js_1.Big(min);
        this.max = max instanceof math_js_1.Big ? max : new math_js_1.Big(max);
    }
    toBuffer() {
        return Buffer.concat([
            this.receiver.toBuffer(),
            this.ratio.toBuffer(),
            this.min.toBuffer(),
            this.max.toBuffer(),
            this.exchangeMinAmount
                ? this.exchangeMinAmount.toBuffer()
                : Buffer.from([]),
        ]);
    }
    toHintedObject() {
        const feeer = Object.assign(Object.assign({}, super.toHintedObject()), { receiver: this.receiver.toString(), ratio: this.ratio.n, min: this.min.toString(), max: this.max.toString() });
        if (this.exchangeMinAmount) {
            return Object.assign(Object.assign({}, feeer), { exchange_min_amount: this.exchangeMinAmount.toString() });
        }
        return feeer;
    }
}
exports.RatioFeeer = RatioFeeer;
//# sourceMappingURL=design.js.map