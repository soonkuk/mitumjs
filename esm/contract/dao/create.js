import { Amount, ContractID, CurrencyID } from "../../types/property.js";
import { Fact } from "../../types/fact.js";
import { Address } from "../../account/address.js";
import { Big } from "../../utils/math.js";
import { Proposers } from "./proposer.js";
import { DaoOption } from "./design.js";
import { Percent } from "./design.js";
const CreateDAOFactHint = "mitum-dao-create-dao-operation-fact";
const CreateDAOHint = "mitum-dao-create-dao-operation";
export class CreateDAOFact extends Fact {
    constructor(token, sender, contract, serviceId, option, voteToken, threshold, fee, proposers, waitingTime, registrationPeriod, preSnapPeriod, votingPeriod, postSnapPeriod, executionDelay, turnout, quorum, currency) {
        super(CreateDAOFactHint, token);
        this.sender = new Address(sender);
        this.contract = new Address(contract);
        this.serviceId = new ContractID(serviceId);
        this.option = new DaoOption(option);
        this.voteToken = new CurrencyID(voteToken);
        this.threshold = new Amount(voteToken, threshold);
        this.fee = new Amount(voteToken, fee);
        this.proposers = new Proposers(true, proposers);
        this.waitingTime = new Big(waitingTime);
        this.registrationPeriod = new Big(registrationPeriod);
        this.preSnapPeriod = new Big(preSnapPeriod);
        this.votingPeriod = new Big(votingPeriod);
        this.postSnapPeriod = new Big(postSnapPeriod);
        this.executionDelay = new Big(executionDelay);
        this.turnout = new Percent(turnout);
        this.quorum = new Percent(quorum);
        this.currency = new CurrencyID(currency);
        this._hash = this.hashing();
    }
    toBuffer() {
        return Buffer.concat([
            this.token.toBuffer(),
            this.sender.toBuffer(),
            this.contract.toBuffer(),
            this.serviceId.toBuffer(),
            this.option.toBuffer(),
            this.voteToken.toBuffer(),
            this.threshold.toBuffer(),
            this.fee.toBuffer(),
            this.proposers.toBuffer(),
            this.waitingTime.toBuffer("fill"),
            this.registrationPeriod.toBuffer("fill"),
            this.preSnapPeriod.toBuffer("fill"),
            this.votingPeriod.toBuffer("fill"),
            this.postSnapPeriod.toBuffer("fill"),
            this.executionDelay.toBuffer("fill"),
            this.turnout.toBuffer(),
            this.quorum.toBuffer(),
            this.currency.toBuffer(),
        ]);
    }
    toHintedObject() {
        return {
            ...super.toHintedObject(),
            sender: this.sender.toString(),
            contract: this.contract.toString(),
            dao_id: this.serviceId.toString(),
            option: this.option.toString(),
            voting_power_token: this.voteToken.toString(),
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
            currency: this.currency.toString(),
        };
    }
    get operationHint() {
        return CreateDAOHint;
    }
}
//# sourceMappingURL=create.js.map