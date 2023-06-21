import { NodeFact } from "../types/fact.js";
import { FactJson } from "../types/iFact.js";
import { CurrencyDesign } from "./design.js";

import { HINT } from "../types/hint.js";

export class CurrencyRegisterFact extends NodeFact {
  readonly design: CurrencyDesign;

  constructor(token: string, design: CurrencyDesign) {
    super(HINT.CURRENCY_REGISTER_OPERATION_FACT, token);
    this.design = design;
    this._hash = this.hashing();
  }

  toBuffer(): Buffer {
    return Buffer.concat([this.token.toBuffer(), this.design.toBuffer()]);
  }

  toHintedObject(): FactJson {
    return {
      ...super.toHintedObject(),
      currency: this.design.toHintedObject(),
    };
  }

  get operationHint() {
    return HINT.CURRENCY_REGISTER_OPERATION;
  }
}
