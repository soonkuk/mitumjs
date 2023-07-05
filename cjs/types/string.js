"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.String = void 0;
class String {
    constructor(s) {
        this.s = s;
    }
    toBuffer() {
        return Buffer.from(this.s);
    }
    toString() {
        return this.s;
    }
}
exports.String = String;
//# sourceMappingURL=string.js.map