import { Hint } from "../types/property";
import { HINT } from "../types/hint";
import { Big, Float } from "../utils/math";
import { Address } from "../account/address";
export class CurrencyDesign {
    constructor(amount, genesisAccount, policy) {
        this.amount = amount;
        this.genesisAccount = Address.from(genesisAccount);
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
CurrencyDesign.hint = new Hint(HINT.CURRENCY_DESIGN);
export class CurrencyPolicy {
    constructor(newAccountMinBalance, feeer) {
        this.newAccountMinBalance = Big.from(newAccountMinBalance);
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
CurrencyPolicy.hint = new Hint(HINT.CURRENCY_POLICY);
class Feeer {
    constructor(hint, exchangeMinAmount) {
        this.hint = new Hint(hint);
        if (exchangeMinAmount) {
            this.exchangeMinAmount =
                exchangeMinAmount instanceof Big
                    ? exchangeMinAmount
                    : new Big(exchangeMinAmount);
        }
    }
    toHintedObject() {
        return {
            _hint: this.hint.toString(),
        };
    }
}
export class NilFeeer extends Feeer {
    constructor() {
        super(HINT.CURRENCY_FEEER_NIL);
    }
    toBuffer() {
        return Buffer.from([]);
    }
}
export class FixedFeeer extends Feeer {
    constructor(receiver, amount) {
        super(HINT.CURRENCY_FEEER_FIXED);
        this.receiver = Address.from(receiver);
        this.amount = Big.from(amount);
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
export class RatioFeeer extends Feeer {
    constructor(receiver, ratio, min, max) {
        super(HINT.CURRENCY_FEEER_RATIO);
        this.receiver = Address.from(receiver);
        this.ratio = new Float(ratio);
        this.min = min instanceof Big ? min : new Big(min);
        this.max = max instanceof Big ? max : new Big(max);
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
//# sourceMappingURL=design.js.map