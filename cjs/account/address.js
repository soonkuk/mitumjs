"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZeroAddress = exports.NodeAddress = exports.Address = void 0;
const hint_1 = require("../types/hint");
const property_1 = require("../types/property");
const config_1 = require("../utils/config");
const error_1 = require("../utils/error");
class BaseAddress {
    constructor(s, type) {
        this.s = s;
        if (type) {
            this.type = type;
        }
        else if (this.s.endsWith(hint_1.SUFFIX.ACCOUNT_ADDRESS)) {
            this.type = "btc";
        }
        else if (this.s.endsWith(hint_1.SUFFIX.ETHER_ACCOUNT_ADDRESS)) {
            this.type = "ether";
        }
        else if (this.s.endsWith(hint_1.SUFFIX.NODE_ADDRESS)) {
            this.type = "node";
        }
        else if (this.s.endsWith(hint_1.SUFFIX.ZERO_ADDRESS)) {
            this.type = "zero";
        }
        else {
            throw error_1.MitumError.detail(error_1.ECODE.INVALID_ADDRESS, "address type not detected");
        }
    }
    toBuffer() {
        return Buffer.from(this.s);
    }
    toString() {
        return this.s;
    }
}
class Address extends BaseAddress {
    constructor(s) {
        super(s);
        error_1.StringAssert.with(s, error_1.MitumError.detail(error_1.ECODE.INVALID_ADDRESS, "invalid address"))
            .empty()
            .not()
            .endsWith(hint_1.SUFFIX.ACCOUNT_ADDRESS, hint_1.SUFFIX.ETHER_ACCOUNT_ADDRESS)
            .satisfyConfig(config_1.MitumConfig.ADDRESS.DEFAULT)
            .excute();
    }
    static from(s) {
        return s instanceof Address ? s : new Address(s);
    }
}
exports.Address = Address;
class NodeAddress extends BaseAddress {
    constructor(s) {
        super(s, "node");
        error_1.StringAssert.with(s, error_1.MitumError.detail(error_1.ECODE.INVALID_ADDRESS, "invalid node address"))
            .empty()
            .not()
            .endsWith(hint_1.SUFFIX.NODE_ADDRESS)
            .satisfyConfig(config_1.MitumConfig.ADDRESS.NODE)
            .excute();
    }
    static from(s) {
        return s instanceof NodeAddress ? s : new NodeAddress(s);
    }
}
exports.NodeAddress = NodeAddress;
class ZeroAddress extends BaseAddress {
    constructor(s) {
        super(s, "zero");
        error_1.StringAssert.with(s, error_1.MitumError.detail(error_1.ECODE.INVALID_ADDRESS, "invalid zero address"))
            .empty()
            .not()
            .endsWith(hint_1.SUFFIX.ZERO_ADDRESS)
            .satisfyConfig(config_1.MitumConfig.ADDRESS.ZERO)
            .excute();
        this.currency = new property_1.CurrencyID(s.substring(0, s.length - config_1.MitumConfig.SUFFIX.ZERO_ADDRESS.value));
    }
    static from(s) {
        return s instanceof ZeroAddress ? s : new ZeroAddress(s);
    }
}
exports.ZeroAddress = ZeroAddress;
//# sourceMappingURL=address.js.map