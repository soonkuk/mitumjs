import { DEFAULT_TOKEN } from "../intro.js";

export class DefaultToken {
  private _tokenID: string = "";

  constructor() {
    const tokenID = DEFAULT_TOKEN;
    this.setDefaultCurrency(tokenID);
  }

  setDefaultCurrency(tokenID: string) {
    this._tokenID = tokenID;
  }

  getDefaultCurrency(): string {
    return this._tokenID;
  }
}
