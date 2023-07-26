"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposeFact = void 0;
const property_js_1 = require("../../types/property.js");
const fact_js_1 = require("../../types/fact.js");
const address_js_1 = require("../../account/address.js");
const math_js_1 = require("../../utils/math.js");
const string_js_1 = require("../../types/string.js");
const ProposeFactHint = "mitum-dao-propose-operation-fact";
const ProposeHint = "mitum-dao-propose-operation";
class ProposeFact extends fact_js_1.Fact {
    constructor(token, sender, contract, serviceId, proposalId, startTime, proposal, currency) {
        super(ProposeFactHint, token);
        this.sender = new address_js_1.Address(sender);
        this.contract = new address_js_1.Address(contract);
        this.serviceId = new property_js_1.ContractID(serviceId);
        this.proposalId = new string_js_1.String(proposalId);
        this.startTime = new math_js_1.Big(startTime);
        this.proposal = proposal;
        this.currency = new property_js_1.CurrencyID(currency);
        this._hash = this.hashing();
    }
    toBuffer() {
        return Buffer.concat([
            this.token.toBuffer(),
            this.sender.toBuffer(),
            this.contract.toBuffer(),
            this.serviceId.toBuffer(),
            this.proposalId.toBuffer(),
            this.startTime.toBuffer("fill"),
            this.proposal.toBuffer(),
            this.currency.toBuffer(),
        ]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { sender: this.sender.toString(), contract: this.contract.toString(), dao_id: this.serviceId.toString(), proposal_id: this.proposalId.toString(), start_time: this.startTime.v, proposal: this.proposal.toHintedObject(), currency: this.currency.toString() });
    }
    get operationHint() {
        return ProposeHint;
    }
}
exports.ProposeFact = ProposeFact;
//# sourceMappingURL=propose.js.map