export class Chain {
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
//# sourceMappingURL=chain.js.map