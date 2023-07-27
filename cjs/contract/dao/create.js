"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDAOFact = void 0;
const property_js_1 = require("../../types/property.js");
const fact_js_1 = require("../../types/fact.js");
const address_js_1 = require("../../account/address.js");
const math_js_1 = require("../../utils/math.js");
const proposer_js_1 = require("./proposer.js");
const design_js_1 = require("./design.js");
const CreateDAOFactHint = "mitum-dao-create-dao-operation-fact";
const CreateDAOHint = "mitum-dao-create-dao-operation";
class CreateDAOFact extends fact_js_1.Fact {
    constructor(token, sender, contract, serviceId, option, voteToken, threshold, fee, proposers, waitingTime, registrationPeriod, preSnapPeriod, votingPeriod, postSnapPeriod, executionDelay, turnout, quorum, currency) {
        super(CreateDAOFactHint, token);
        this.sender = new address_js_1.Address(sender);
        this.contract = new address_js_1.Address(contract);
        this.serviceId = new property_js_1.ContractID(serviceId);
        this.option = new design_js_1.DaoOption(option);
        this.voteToken = new property_js_1.CurrencyID(voteToken);
        this.threshold = new property_js_1.Amount(voteToken, threshold);
        this.fee = new property_js_1.Amount(voteToken, fee);
        if (proposers.length === 0) {
            this.proposers = new proposer_js_1.Proposers(false, proposers);
        }
        else {
            this.proposers = new proposer_js_1.Proposers(true, proposers);
        }
        this.waitingTime = new math_js_1.Big(waitingTime);
        this.registrationPeriod = new math_js_1.Big(registrationPeriod);
        this.preSnapPeriod = new math_js_1.Big(preSnapPeriod);
        this.votingPeriod = new math_js_1.Big(votingPeriod);
        this.postSnapPeriod = new math_js_1.Big(postSnapPeriod);
        this.executionDelay = new math_js_1.Big(executionDelay);
        this.turnout = new math_js_1.Percent(turnout);
        this.quorum = new math_js_1.Percent(quorum);
        this.currency = new property_js_1.CurrencyID(currency);
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
            this.currency.toBuffer(),
        ]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { sender: this.sender.toString(), contract: this.contract.toString(), dao_id: this.serviceId.toString(), option: this.option.toString(), voting_power_token: this.voteToken.toString(), threshold: this.threshold.toHintedObject(), fee: this.fee.toHintedObject(), whitelist: this.proposers.toHintedObject(), proposal_review_period: this.waitingTime.v, registration_period: this.registrationPeriod.v, pre_snapshot_period: this.preSnapPeriod.v, voting_period: this.votingPeriod.v, post_snapshot_period: this.postSnapPeriod.v, execution_delay_period: this.executionDelay.v, turnout: this.turnout.v, quorum: this.quorum.v, currency: this.currency.toString() });
    }
    get operationHint() {
        return CreateDAOHint;
    }
}
exports.CreateDAOFact = CreateDAOFact;
//# sourceMappingURL=create.js.map