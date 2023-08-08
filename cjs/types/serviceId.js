"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceID = void 0;
class ServiceID {
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
exports.ServiceID = ServiceID;
//# sourceMappingURL=serviceId.js.map