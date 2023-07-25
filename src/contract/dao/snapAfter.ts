import { ContractID, CurrencyID } from "../../types/property.js";
import { Address } from "../../account/address.js";
import { FactJson } from "../../types/iFact.js";
import { String } from "../../types/string.js";
import { Fact } from "../../types/fact.js";

const PostSnapFactHint = "mitum-dao-post-snap-operation-fact";
const PostSnapHint = "mitum-dao-post-snap-operation";

export class PostSnapFact extends Fact {
  readonly sender: Address;
  readonly contract: Address;
  readonly serviceId: ContractID;
  readonly proposalId: String;
  readonly currency: CurrencyID;

  constructor(
    token: string,
    sender: string,
    contract: string,
    serviceId: string,
    proposalId: string,
    currency: string
  ) {
    super(PostSnapFactHint, token);

    this.sender = new Address(sender);
    this.contract = new Address(contract);
    this.serviceId = new ContractID(serviceId);
    this.proposalId = new String(proposalId);
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
      currency: this.currency.toString(),
    };
  }

  get operationHint() {
    return PostSnapHint;
  }
}
