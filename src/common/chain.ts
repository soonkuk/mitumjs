import { MITUM_NETWORK_ID } from "../intro.js";

export class Chain {
  private _chainID: string = "";

  constructor() {
    const chID = MITUM_NETWORK_ID;
    this.setChainID(chID);
  }

  setChainID(chID: string) {
    this._chainID = chID;
  }

  getChainID(): string {
    return this._chainID;
  }
}
