import { CurrencyID } from "../types/property.js";
import { FactJson } from "../types/iFact.js";
import { NodeFact } from "../types/fact.js";
import { HINT } from "../types/hint.js";

import { CurrencyPolicy } from "./design.js";

export class CurrencyPolicyUpdaterFact extends NodeFact {
  readonly currency: CurrencyID;
  readonly policy: CurrencyPolicy;

  constructor(
    token: string,
    currency: string | CurrencyID,
    policy: CurrencyPolicy
  ) {
    super(HINT.CURRENCY_POLICY_UPDATER_OPERATION_FACT, token);
    this.currency = CurrencyID.from(currency);
    this.policy = policy;
    this._hash = this.hashing();
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      super.toBuffer(),
      this.currency.toBuffer(),
      this.policy.toBuffer(),
    ]);
  }

  toHintedObject(): FactJson {
    return {
      ...super.toHintedObject(),
      currency: this.currency.toString(),
      policy: this.policy.toHintedObject(),
    };
  }

  get operationHint() {
    return HINT.CURRENCY_POLICY_UPDATER_OPERATION;
  }
}
