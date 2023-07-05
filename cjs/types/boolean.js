"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Boolean = void 0;
class Boolean {
    constructor(b) {
        this.b = b;
    }
    toBuffer() {
        return this.b ? Buffer.from([1]) : Buffer.from([0]);
    }
    get v() {
        return this.b;
    }
}
exports.Boolean = Boolean;
//# sourceMappingURL=boolean.js.map