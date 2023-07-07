export class Date {
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
//# sourceMappingURL=date.js.map