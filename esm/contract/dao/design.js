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
//# sourceMappingURL=design.js.map