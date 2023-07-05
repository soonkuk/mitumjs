export class String {
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
//# sourceMappingURL=string.js.map