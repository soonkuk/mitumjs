"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Amount = exports.ContractID = exports.CurrencyID = exports.ID = exports.Token = exports.Hint = void 0;
const intro_1 = require("../intro");
const hint_1 = require("./hint");
const math_1 = require("../utils/math");
const config_1 = require("../utils/config");
const error_1 = require("../utils/error");
class Hint {
    constructor(s) {
        this.s = s;
    }
    toString() {
        return `${this.s}-${intro_1.MITUM_VERSION}`;
    }
}
exports.Hint = Hint;
class Token {
    constructor(s) {
        error_1.Assert.check(s !== "", error_1.MitumError.detail(error_1.ECODE.INVALID_TOKEN, "empty token"));
        this.s = s;
    }
    static from(s) {
        return s instanceof Token ? s : new Token(s);
    }
    toBuffer() {
        return Buffer.from(this.s);
    }
    toString() {
        return Buffer.from(this.s, "utf8").toString("base64");
    }
}
exports.Token = Token;
class ID {
    constructor(s) {
        this.s = s;
    }
    equal(id) {
        return this.toString() === id.toString();
    }
    toBuffer() {
        return Buffer.from(this.s);
    }
    toString() {
        return this.s;
    }
}
exports.ID = ID;
class CurrencyID extends ID {
    constructor(s) {
        super(s);
        error_1.Assert.check(config_1.MitumConfig.CURRENCY_ID.satisfy(s.length), error_1.MitumError.detail(error_1.ECODE.INVALID_CURRENCY_ID, "currency id length out of range"));
    }
    static from(s) {
        return s instanceof CurrencyID ? s : new CurrencyID(s);
    }
}
exports.CurrencyID = CurrencyID;
class ContractID extends ID {
    constructor(s) {
        super(s);
        error_1.Assert.check(config_1.MitumConfig.CONTRACT_ID.satisfy(s.length), error_1.MitumError.detail(error_1.ECODE.INVALID_CONTRACT_ID, "contract id length out of range"));
    }
    static from(s) {
        return s instanceof ContractID ? s : new ContractID(s);
    }
}
exports.ContractID = ContractID;
class Amount {
    constructor(currency, big) {
        this.currency = CurrencyID.from(currency);
        this.big = math_1.Big.from(big);
        error_1.Assert.check(0 < this.big.big, error_1.MitumError.detail(error_1.ECODE.INVALID_AMOUNT, "zero big"));
    }
    toBuffer() {
        return Buffer.concat([this.big.toBuffer(), this.currency.toBuffer()]);
    }
    toHintedObject() {
        return {
            _hint: Amount.hint.toString(),
            currency: this.currency.toString(),
            amount: this.big.toString(),
        };
    }
}
exports.Amount = Amount;
Amount.hint = new Hint(hint_1.HINT.AMOUNT);
//# sourceMappingURL=property.js.map