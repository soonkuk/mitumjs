export class Boolean {
    constructor(b) {
        this.b = b;
    }
    toBuffer() {
        return this.b ? Buffer.from([1]) : Buffer.from([0]);
    }
    get v() {
        return this.b;
    }
}
//# sourceMappingURL=boolean.js.map