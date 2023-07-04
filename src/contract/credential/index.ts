import { isIPAddress } from "../../utils/validation.js";

export class Credential {
  private _networkID: string = "";
  private _node: string = "";
  private _address: string = "";
  private _collection: string = "";

  constructor(networkID: string, provider?: string) {
    this._setNode(provider);
    this._setChain(networkID);
  }

  private _setNode(provider?: string) {
    if (isIPAddress(provider)) {
      this._node = provider as string;
    }
  }

  private _setChain(networkID: string) {
    this._networkID = networkID;
  }
}
