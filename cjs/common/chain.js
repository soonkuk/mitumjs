"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chain = void 0;
const intro_1 = require("../intro");
class Chain {
    constructor() {
        this._chainID = "";
        const chID = intro_1.MITUM_NETWORK_ID;
        this.setChainID(chID);
    }
    setChainID(chID) {
        this._chainID = chID;
    }
    getChainID() {
        return this._chainID;
    }
}
exports.Chain = Chain;
//# sourceMappingURL=chain.js.map