import { MITUM_NETWORK_ID } from "../intro";
export class Chain {
    constructor() {
        this._chainID = "";
        const chID = MITUM_NETWORK_ID;
        this.setChainID(chID);
    }
    setChainID(chID) {
        this._chainID = chID;
    }
    getChainID() {
        return this._chainID;
    }
}
//# sourceMappingURL=chain.js.map