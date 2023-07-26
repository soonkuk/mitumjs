import { Uint8 } from "../../utils/math.js";
export const CRYPTO = "crypto";
export const BIZ = "biz";
export class DaoOption {
    constructor(o) {
        if (o === CRYPTO || o === BIZ) {
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
export class Percent {
    constructor(p) {
        if (p > 100) {
            throw new Error("The turnout or quorum value can't exceed 100 percent.");
        }
        this.p = new Uint8(p);
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
//# sourceMappingURL=design.js.map