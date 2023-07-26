"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GovernanceCallData = exports.TransferCalldata = void 0;
const address_js_1 = require("../../account/address.js");
const property_js_1 = require("../../types/property.js");
const policy_js_1 = require("./policy.js");
const TransferCalldataHint = "mitum-dao-transfer-calldata";
const GovernanceCalldataHint = "mitum-dao-governance-calldata";
class TransferCalldata {
    constructor(sender, receiver, currency, amount) {
        this.hint = new property_js_1.Hint(TransferCalldataHint);
        this.sender = new address_js_1.Address(sender);
        this.receiver = new address_js_1.Address(receiver);
        this.amount = new property_js_1.Amount(currency, amount);
    }
    toBuffer() {
        return Buffer.concat([
            this.sender.toBuffer(),
            this.receiver.toBuffer(),
            this.amount.toBuffer(),
        ]);
    }
    toHintedObject() {
        return {
            _hint: this.hint.toString(),
            sender: this.sender.toString(),
            receiver: this.receiver.toString(),
            amount: this.amount.toHintedObject(),
        };
    }
}
exports.TransferCalldata = TransferCalldata;
class GovernanceCallData {
    constructor(p) {
        this.hint = new property_js_1.Hint(GovernanceCalldataHint);
        this.policy = new policy_js_1.Policy(p.voteToken, p.threshold, p.fee, p.proposers, p.waitingTime, p.registrationPeriod, p.preSnapPeriod, p.votingPeriod, p.postSnapPeriod, p.executionDelay, p.turnout, p.quorum);
    }
    toBuffer() {
        return Buffer.concat([this.policy.toBuffer()]);
    }
    toHintedObject() {
        return {
            _hint: this.hint.toString(),
            policy: this.policy.toHintedObject(),
        };
    }
}
exports.GovernanceCallData = GovernanceCallData;
//# sourceMappingURL=calldata.js.map