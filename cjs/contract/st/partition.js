"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Partition = void 0;
class Partition {
    constructor(p) {
        this.p = p;
    }
    toBuffer() {
        return Buffer.from(this.p);
    }
    toString() {
        return this.p;
    }
}
exports.Partition = Partition;
//# sourceMappingURL=partition.js.map