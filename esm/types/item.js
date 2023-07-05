import { Hint } from "./property.js";
export class Item {
    constructor(hint) {
        this.hint = new Hint(hint);
    }
    toHintedObject() {
        return {
            _hint: this.hint.toString(),
        };
    }
}
//# sourceMappingURL=item.js.map