"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BizProposal = exports.CryptoProposal = void 0;
const address_js_1 = require("../../account/address.js");
const property_js_1 = require("../../types/property.js");
const string_js_1 = require("../../types/string.js");
const math_js_1 = require("../../utils/math.js");
const CryptoProposalHint = "mitum-dao-crypto-proposal";
const BizProposalHint = "mitum-dao-biz-proposal";
class CryptoProposal {
    constructor(proposer, startTime, calldata) {
        this.hint = new property_js_1.Hint(CryptoProposalHint);
        this.proposer = new address_js_1.Address(proposer);
        this.startTime = new math_js_1.Big(startTime);
        this.calldata = calldata;
    }
    toBuffer() {
        return Buffer.concat([
            this.proposer.toBuffer(),
            this.startTime.toBuffer("fill"),
            this.calldata.toBuffer(),
        ]);
    }
    toHintedObject() {
        return {
            _hint: this.hint.toString(),
            proposer: this.proposer.toString(),
            start_time: this.startTime.v,
            call_data: this.calldata.toHintedObject(),
        };
    }
}
exports.CryptoProposal = CryptoProposal;
class BizProposal {
    constructor(proposer, startTime, url, hash, options) {
        this.hint = new property_js_1.Hint(BizProposalHint);
        this.proposer = new address_js_1.Address(proposer);
        this.startTime = new math_js_1.Big(startTime);
        this.url = new string_js_1.String(url);
        this.hash = new string_js_1.String(hash);
        this.options = new math_js_1.Uint8(options);
    }
    toBuffer() {
        return Buffer.concat([
            this.proposer.toBuffer(),
            this.startTime.toBuffer("fill"),
            this.url.toBuffer(),
            this.hash.toBuffer(),
            this.options.toBuffer(),
        ]);
    }
    toHintedObject() {
        return {
            _hint: this.hint.toString(),
            proposer: this.proposer.toString(),
            start_time: this.startTime.v,
            url: this.url.toString(),
            hash: this.hash.toString(),
            options: this.options.v,
        };
    }
}
exports.BizProposal = BizProposal;
//# sourceMappingURL=proposal.js.map