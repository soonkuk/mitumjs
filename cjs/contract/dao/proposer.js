"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proposers = void 0;
const address_js_1 = require("../../account/address.js");
const boolean_js_1 = require("../../types/boolean.js");
const property_js_1 = require("../../types/property.js");
const error_js_1 = require("../../utils/error.js");
const math_js_1 = require("../../utils/math.js");
const WhitelistHint = "mitum-dao-whitelist";
class Proposers {
    constructor(active, accounts) {
        this.hint = new property_js_1.Hint(WhitelistHint);
        this.active = new boolean_js_1.Boolean(active);
        error_js_1.Assert.check(Array.isArray(accounts), error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The type of 'proposers' must be of type 'Array'."));
        const proposersSet = new Set(accounts);
        error_js_1.Assert.check(proposersSet.size === accounts.length, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "A duplicate value exists in the proposers"));
        this.accounts = accounts.map((p) => new address_js_1.Address(p));
    }
    toBuffer() {
        return Buffer.concat([
            this.active.toBuffer(),
            Buffer.concat(this.accounts.sort(math_js_1.SortFunc).map((p) => p.toBuffer())),
        ]);
    }
    toHintedObject() {
        return {
            _hint: this.hint.toString(),
            active: this.active.v,
            accounts: this.accounts.sort(math_js_1.SortFunc).map((p) => p.toString()),
        };
    }
}
exports.Proposers = Proposers;
//# sourceMappingURL=proposer.js.map