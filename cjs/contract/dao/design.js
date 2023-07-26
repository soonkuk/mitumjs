"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Percent = exports.DaoOption = exports.BIZ = exports.CRYPTO = void 0;
const math_js_1 = require("../../utils/math.js");
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
class Percent {
    constructor(p) {
        if (p > 100) {
            throw new Error("The turnout or quorum value can't exceed 100 percent.");
        }
        this.p = new math_js_1.Uint8(p);
    }
    toBuffer() {
        return this.p.toBuffer();
    }
    toString() {
        return this.p.toString();
    }
    get v() {
        return this.p.v;
    }
}
exports.Percent = Percent;
//# sourceMappingURL=design.js.map