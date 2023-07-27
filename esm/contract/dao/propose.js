import { ContractID, CurrencyID } from "../../types/property.js";
import { Fact } from "../../types/fact.js";
import { Address } from "../../account/address.js";
import { String } from "../../types/string.js";
const ProposeFactHint = "mitum-dao-propose-operation-fact";
const ProposeHint = "mitum-dao-propose-operation";
export class ProposeFact extends Fact {
    constructor(token, sender, contract, serviceId, proposalId, proposal, currency) {
        super(ProposeFactHint, token);
        this.sender = new Address(sender);
        this.contract = new Address(contract);
        this.serviceId = new ContractID(serviceId);
        this.proposalId = new String(proposalId);
        this.proposal = proposal;
        this.currency = new CurrencyID(currency);
        this._hash = this.hashing();
    }
    toBuffer() {
        return Buffer.concat([
            this.token.toBuffer(),
            this.sender.toBuffer(),
            this.contract.toBuffer(),
            this.serviceId.toBuffer(),
            this.proposalId.toBuffer(),
            this.proposal.toBuffer(),
            this.currency.toBuffer(),
        ]);
    }
    toHintedObject() {
        return {
            ...super.toHintedObject(),
            sender: this.sender.toString(),
            contract: this.contract.toString(),
            dao_id: this.serviceId.toString(),
            proposal_id: this.proposalId.toString(),
            proposal: this.proposal.toHintedObject(),
            currency: this.currency.toString(),
        };
    }
    get operationHint() {
        return ProposeHint;
    }
}
//# sourceMappingURL=propose.js.map