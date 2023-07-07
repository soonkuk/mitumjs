"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Date = void 0;
class Date {
    constructor(d) {
        this.d = d;
    }
    toBuffer() {
        return Buffer.from(this.d);
    }
    get v() {
        return this.d;
    }
}
exports.Date = Date;
//# sourceMappingURL=date.js.map