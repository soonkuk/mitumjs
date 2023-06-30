export class Chain {
  private _chainID: string = "";

  constructor(networkID: string) {
    this.setChainID(networkID);
  }

  setChainID(chID: string) {
    this._chainID = chID;
  }

  getChainID(): string {
    return this._chainID;
  }
}
