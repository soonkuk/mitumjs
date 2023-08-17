import { Amount, CurrencyID, Hint } from "../../types/property.js";
import { Proposers } from "./proposer.js";
import { Big } from "../../utils/math.js";
import { Percent } from "../../utils/math.js";
const PolicyHint = "mitum-dao-policy";
export class Policy {
    constructor(voteToken, threshold, fee, proposers, waitingTime, registrationPeriod, preSnapPeriod, votingPeriod, postSnapPeriod, executionDelay, turnout, quorum) {
        this.hint = new Hint(PolicyHint);
        this.votingToken = new CurrencyID(voteToken);
        this.threshold = new Big(threshold);
        this.fee = new Amount(voteToken, fee);
        if (proposers.length === 0) {
            this.proposers = new Proposers(false, proposers);
        }
        else {
            this.proposers = new Proposers(true, proposers);
        }
        this.waitingTime = new Big(waitingTime);
        this.registrationPeriod = new Big(registrationPeriod);
        this.preSnapPeriod = new Big(preSnapPeriod);
        this.votingPeriod = new Big(votingPeriod);
        this.postSnapPeriod = new Big(postSnapPeriod);
        this.executionDelay = new Big(executionDelay);
        this.turnout = new Percent(turnout);
        this.quorum = new Percent(quorum);
    }
    toBuffer() {
        return Buffer.concat([
            this.votingToken.toBuffer(),
            this.fee.toBuffer(),
            this.threshold.toBuffer("fill"),
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
            threshold: this.threshold.v,
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
//# sourceMappingURL=policy.js.map