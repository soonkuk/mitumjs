"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Policy = void 0;
const property_js_1 = require("../../types/property.js");
const proposer_js_1 = require("./proposer.js");
const math_js_1 = require("../../utils/math.js");
const math_js_2 = require("../../utils/math.js");
const PolicyHint = "mitum-dao-policy";
class Policy {
    constructor(voteToken, threshold, fee, proposers, waitingTime, registrationPeriod, preSnapPeriod, votingPeriod, postSnapPeriod, executionDelay, turnout, quorum) {
        this.hint = new property_js_1.Hint(PolicyHint);
        this.votingToken = new property_js_1.CurrencyID(voteToken);
        this.threshold = new property_js_1.Amount(voteToken, threshold);
        this.fee = new property_js_1.Amount(voteToken, fee);
        this.proposers = new proposer_js_1.Proposers(true, proposers);
        this.waitingTime = new math_js_1.Big(waitingTime);
        this.registrationPeriod = new math_js_1.Big(registrationPeriod);
        this.preSnapPeriod = new math_js_1.Big(preSnapPeriod);
        this.votingPeriod = new math_js_1.Big(votingPeriod);
        this.postSnapPeriod = new math_js_1.Big(postSnapPeriod);
        this.executionDelay = new math_js_1.Big(executionDelay);
        this.turnout = new math_js_2.Percent(turnout);
        this.quorum = new math_js_2.Percent(quorum);
    }
    toBuffer() {
        return Buffer.concat([
            this.votingToken.toBuffer(),
            this.fee.toBuffer(),
            this.threshold.toBuffer(),
            this.proposers.toBuffer(),
            this.waitingTime.toBuffer("fill"),
            this.registrationPeriod.toBuffer("fill"),
            this.preSnapPeriod.toBuffer("fill"),
            this.votingPeriod.toBuffer("fill"),
            this.postSnapPeriod.toBuffer("fill"),
            this.executionDelay.toBuffer("fill"),
            this.turnout.toBuffer(),
            this.quorum.toBuffer(),
        ]);
    }
    toHintedObject() {
        return {
            _hint: this.hint.toString(),
            token: this.votingToken.toString(),
            threshold: this.threshold.toHintedObject(),
            fee: this.fee.toHintedObject(),
            whitelist: this.proposers.toHintedObject(),
            proposal_review_period: this.waitingTime.v,
            registration_period: this.registrationPeriod.v,
            pre_snapshot_period: this.preSnapPeriod.v,
            voting_period: this.votingPeriod.v,
            post_snapshot_period: this.postSnapPeriod.v,
            execution_delay_period: this.executionDelay.v,
            turnout: this.turnout.v,
            quorum: this.quorum.v,
        };
    }
}
exports.Policy = Policy;
//# sourceMappingURL=policy.js.map