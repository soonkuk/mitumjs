"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chain = void 0;
class Chain {
    constructor(networkID) {
        this._chainID = "";
        this.setChainID(networkID);
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