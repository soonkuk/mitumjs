import { SUFFIX } from "../types/hint.js";
import { CurrencyID } from "../types/property.js";
import { MitumConfig } from "../utils/config.js";
import { ECODE, MitumError, StringAssert } from "../utils/error.js";
class BaseAddress {
    constructor(s, type) {
        this.s = s;
        if (type) {
            this.type = type;
        }
        else if (this.s.endsWith(SUFFIX.ACCOUNT_ADDRESS)) {
            this.type = "mca";
        }
        else if (this.s.endsWith(SUFFIX.ETHER_ACCOUNT_ADDRESS)) {
            this.type = "eca";
        }
        else if (this.s.endsWith(SUFFIX.NODE_ADDRESS)) {
            this.type = "node";
        }
        else if (this.s.endsWith(SUFFIX.ZERO_ADDRESS)) {
            this.type = "zero";
        }
        else {
            throw MitumError.detail(ECODE.INVALID_ADDRESS, "address type not detected");
        }
    }
    toBuffer() {
        return Buffer.from(this.s);
    }
    toString() {
        return this.s;
    }
}
export class Address extends BaseAddress {
    constructor(s) {
        super(s);
        StringAssert.with(s, MitumError.detail(ECODE.INVALID_ADDRESS, "invalid address"))
            .empty()
            .not()
            .endsWith(SUFFIX.ACCOUNT_ADDRESS, SUFFIX.ETHER_ACCOUNT_ADDRESS)
            .satisfyConfig(MitumConfig.ADDRESS.DEFAULT)
            .excute();
    }
    static from(s) {
        return s instanceof Address ? s : new Address(s);
    }
}
export class NodeAddress extends BaseAddress {
    constructor(s) {
        super(s, "node");
        StringAssert.with(s, MitumError.detail(ECODE.INVALID_ADDRESS, "invalid node address"))
            .empty()
            .not()
            .endsWith(SUFFIX.NODE_ADDRESS)
            .satisfyConfig(MitumConfig.ADDRESS.NODE)
            .excute();
    }
    static from(s) {
        return s instanceof NodeAddress ? s : new NodeAddress(s);
    }
}
export class ZeroAddress extends BaseAddress {
    constructor(s) {
        super(s, "zero");
        StringAssert.with(s, MitumError.detail(ECODE.INVALID_ADDRESS, "invalid zero address"))
            .empty()
            .not()
            .endsWith(SUFFIX.ZERO_ADDRESS)
            .satisfyConfig(MitumConfig.ADDRESS.ZERO)
            .excute();
        this.currency = new CurrencyID(s.substring(0, s.length - MitumConfig.SUFFIX.ZERO_ADDRESS.value));
    }
    static from(s) {
        return s instanceof ZeroAddress ? s : new ZeroAddress(s);
    }
}
//# sourceMappingURL=address.js.map