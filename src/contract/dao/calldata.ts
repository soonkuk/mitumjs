import { Address } from "../../account/address.js";
import { HintedObject, IBuffer, IHintedObject } from "../../types/interface.js";
import { Amount, Hint } from "../../types/property.js";
import { Policy } from "./policy.js";
import { policyData } from "./design.js";

const TransferCalldataHint = "mitum-dao-transfer-calldata";
const GovernanceCalldataHint = "mitum-dao-governance-calldata";

export interface Calldata extends IBuffer, IHintedObject {
  hint: Hint;
  toBuffer(): Buffer;
  toHintedObject(): HintedObject;
}

export class TransferCalldata implements Calldata {
  readonly hint: Hint;
  readonly sender: Address;
  readonly receiver: Address;
  readonly amount: Amount;

  constructor(
    sender: string,
    receiver: string,
    currency: string,
    amount: number
  ) {
    this.hint = new Hint(TransferCalldataHint);

    this.sender = new Address(sender);
    this.receiver = new Address(receiver);
    this.amount = new Amount(currency, amount);
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      this.sender.toBuffer(),
      this.receiver.toBuffer(),
      this.amount.toBuffer(),
    ]);
  }

  toHintedObject(): HintedObject {
    return {
      _hint: this.hint.toString(),
      sender: this.sender.toString(),
      receiver: this.receiver.toString(),
      amount: this.amount.toHintedObject(),
    };
  }
}

export class GovernanceCallData implements Calldata {
  readonly hint: Hint;
  readonly policy: Policy;

  constructor(p: policyData) {
    this.hint = new Hint(GovernanceCalldataHint);

    this.policy = new Policy(
      p.voteToken,
      p.threshold,
      p.fee,
      p.proposers,
      p.waitingTime,
      p.registrationPeriod,
      p.preSnapPeriod,
      p.votingPeriod,
      p.postSnapPeriod,
      p.executionDelay,
      p.turnout,
      p.quorum
    );
  }

  toBuffer(): Buffer {
    return Buffer.concat([this.policy.toBuffer()]);
  }

  toHintedObject(): HintedObject {
    return {
      _hint: this.hint.toString(),
      policy: this.policy.toHintedObject(),
    };
  }
}
