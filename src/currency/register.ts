import { NodeFact } from "../types/fact";
import { FactJson } from "../types/iFact";
import { CurrencyDesign } from "./design";

import { HINT } from "../types/hint";

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
