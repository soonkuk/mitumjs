import { ContractID, CurrencyID } from "../../types/property.js";
import { Address } from "../../account/address.js";
import { FactJson } from "../../types/iFact.js";
import { String } from "../../types/string.js";
import { Fact } from "../../types/fact.js";
import { Uint8 } from "../../utils/math.js";

const VoteFactHint = "mitum-dao-vote-operation-fact";
const VoteHint = "mitum-dao-vote-operation";

export class VoteFact extends Fact {
  readonly sender: Address;
  readonly contract: Address;
  readonly serviceId: ContractID;
  readonly proposalId: String;
  readonly vote: Uint8;
  readonly currency: CurrencyID;

  constructor(
    token: string,
    sender: string,
    contract: string,
    serviceId: string,
    proposalId: string,
    vote: number,
    currency: string
  ) {
    super(VoteFactHint, token);

    this.sender = new Address(sender);
    this.contract = new Address(contract);
    this.serviceId = new ContractID(serviceId);
    this.proposalId = new String(proposalId);
    this.vote = new Uint8(vote);
    this.currency = new CurrencyID(currency);

    this._hash = this.hashing();
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      this.token.toBuffer(),
      this.sender.toBuffer(),
      this.contract.toBuffer(),
      this.serviceId.toBuffer(),
      this.proposalId.toBuffer(),
      this.vote.toBuffer(),
      this.currency.toBuffer(),
    ]);
  }

  toHintedObject(): FactJson {
    return {
      ...super.toHintedObject(),
      sender: this.sender.toString(),
      contract: this.contract.toString(),
      dao_id: this.serviceId.toString(),
      proposal_id: this.proposalId.toString(),
      vote: this.vote.v,
      currency: this.currency.toString(),
    };
  }

  get operationHint() {
    return VoteHint;
  }
}
