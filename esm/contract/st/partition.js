export class Partition {
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
//# sourceMappingURL=partition.js.map