"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaoOption = exports.BIZ = exports.CRYPTO = void 0;
exports.CRYPTO = "crypto";
exports.BIZ = "biz";
class DaoOption {
    constructor(o) {
        if (o === exports.CRYPTO || o === exports.BIZ) {
            this.o = o;
        }
        else {
            throw new Error(`Invalid dao's option-value: ${o}`);
        }
    }
    toBuffer() {
        return Buffer.from(this.o);
    }
    toString() {
        return this.o;
    }
}
exports.DaoOption = DaoOption;
//# sourceMappingURL=design.js.map