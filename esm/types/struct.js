import { MITUM_VERSION } from "../constant";
import { HINT } from "./hint";
import { Big } from "../utils/math";
import { MitumConfig } from "../utils/config";
import { Assert, ECODE, MitumError } from "../utils/error";
class Hint {
    constructor(s) {
        this.s = s;
    }
    toString() {
        return `${this.s}-${MITUM_VERSION}`;
    }
}
class Token {
    constructor(s) {
        Assert.check(s !== "", MitumError.detail(ECODE.INVALID_TOKEN, "empty token"));
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
class CurrencyID extends ID {
    constructor(s) {
        super(s);
        Assert.check(MitumConfig.CURRENCY_ID.satisfy(s.length), MitumError.detail(ECODE.INVALID_CURRENCY_ID, "currency id length out of range"));
    }
    static from(s) {
        return s instanceof CurrencyID ? s : new CurrencyID(s);
    }
}
class ContractID extends ID {
    constructor(s) {
        super(s);
        Assert.check(MitumConfig.CONTRACT_ID.satisfy(s.length), MitumError.detail(ECODE.INVALID_CONTRACT_ID, "contract id length out of range"));
    }
    static from(s) {
        return s instanceof ContractID ? s : new ContractID(s);
    }
}
class Amount {
    constructor(currency, big) {
        this.currency = CurrencyID.from(currency);
        this.big = Big.from(big);
        Assert.check(0 < this.big.big, MitumError.detail(ECODE.INVALID_AMOUNT, "zero big"));
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
Amount.hint = new Hint(HINT.AMOUNT);
export { Hint, Token, ID, CurrencyID, ContractID, Amount };
//# sourceMappingURL=struct.js.map