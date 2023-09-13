import { SortFunc } from "../utils/math.js";

import { Fact } from "../types/fact.js";
import { HINT } from "../types/hint.js";
import { CurrencyID } from "../types/property.js";

import { Address } from "../account/address.js";
import {FactJson} from "../types/iFact";

export class UpdateOperatorFact extends Fact {
  readonly sender: Address;
  readonly contract: Address;
  readonly operators: Address[];
  readonly currency: CurrencyID;

  constructor(
    token: string,
    sender: string | Address,
    contract: string | Address,
    operators: string[],
    currency: string | CurrencyID
  ) {
    super(HINT.UPDATE_OPERATOR_OPERATION_FACT, token);
    this.sender = Address.from(sender);
    this.contract = Address.from(contract);
    this.operators = operators.map((w) => new Address(w));
    this.currency = CurrencyID.from(currency);
    this._hash = this.hashing();
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      this.token.toBuffer(),
      this.sender.toBuffer(),
      this.contract.toBuffer(),
      Buffer.concat(this.operators.sort(SortFunc).map((w) => w.toBuffer())),
      this.currency.toBuffer(),
    ]);
  }

  toHintedObject(): FactJson {
    return {
      ...super.toHintedObject(),
      sender: this.sender.toString(),
      contract: this.contract.toString(),
      whitelist: this.operators.sort(SortFunc).map((w) => w.toString()),
      currency: this.currency.toString(),
    };
  }

  get operationHint() {
    return HINT.UPDATE_OPERATOR_OPERATION;
  }
}