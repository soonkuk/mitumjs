import { Address } from "../../account/address.js";
import { Amount, Hint } from "../../types/property.js";
import { Policy } from "./policy.js";
const TransferCalldataHint = "mitum-dao-transfer-calldata";
const GovernanceCalldataHint = "mitum-dao-governance-calldata";
export class TransferCalldata {
    constructor(sender, receiver, currency, amount) {
        this.hint = new Hint(TransferCalldataHint);
        this.sender = new Address(sender);
        this.receiver = new Address(receiver);
        this.amount = new Amount(currency, amount);
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
export class GovernanceCallData {
    constructor(p) {
        this.hint = new Hint(GovernanceCalldataHint);
        this.policy = new Policy(p.voteToken, p.threshold, p.fee, p.proposers, p.waitingTime, p.registrationPeriod, p.preSnapPeriod, p.votingPeriod, p.postSnapPeriod, p.executionDelay, p.turnout, p.quorum);
    }
    toBuffer() {
        return this.policy.toBuffer();
    }
    toHintedObject() {
        return {
            _hint: this.hint.toString(),
            policy: this.policy.toHintedObject(),
        };
    }
}
//# sourceMappingURL=calldata.js.map