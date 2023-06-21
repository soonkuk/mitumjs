import { NodeFact } from "../types/fact.js";
import { HINT } from "../types/hint.js";
export class CurrencyRegisterFact extends NodeFact {
    constructor(token, design) {
        super(HINT.CURRENCY_REGISTER_OPERATION_FACT, token);
        this.design = design;
        this._hash = this.hashing();
    }
    toBuffer() {
        return Buffer.concat([this.token.toBuffer(), this.design.toBuffer()]);
    }
    toHintedObject() {
        return {
            ...super.toHintedObject(),
            currency: this.design.toHintedObject(),
        };
    }
    get operationHint() {
        return HINT.CURRENCY_REGISTER_OPERATION;
    }
}
//# sourceMappingURL=register.js.map