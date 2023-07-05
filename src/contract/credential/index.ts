import { isIPAddress } from "../../utils/validation.js";
import { TimeStamp } from "../../utils/time.js";

export class Credential {
  private _networkID: string = "";
  private _node: string = "";
  private _address: string = "";
  private _credential: string = "";

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

  createService(): OperationType<Fact> {
    const token = new TimeStamp().UTC();

    return new OperationType(this._networkID, fact);
  }

  addTemplate(): OperationType<Fact> {
    const token = new TimeStamp().UTC();

    return new OperationType(this._networkID, fact);
  }

  issue(): OperationType<Fact> {
    const token = new TimeStamp().UTC();

    return new OperationType(this._networkID, fact);
  }

  revoke(): OperationType<Fact> {
    const token = new TimeStamp().UTC();

    return new OperationType(this._networkID, fact);
  }
}
