export class ServiceID {
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
//# sourceMappingURL=serviceId.js.map