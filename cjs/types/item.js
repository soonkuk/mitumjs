"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const property_js_1 = require("./property.js");
class Item {
    constructor(hint) {
        this.hint = new property_js_1.Hint(hint);
    }
    toHintedObject() {
        return {
            _hint: this.hint.toString(),
        };
    }
}
exports.Item = Item;
//# sourceMappingURL=item.js.map