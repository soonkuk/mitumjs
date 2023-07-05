import { isIPAddress } from "../../utils/validation.js";
import { TimeStamp } from "../../utils/time.js";
import { isAddress } from "../../utils/validation.js";
import { OperationType } from "../../types/operation.js";
import { Fact } from "../../types/fact.js";

export class Credential {
  private _networkID: string = "";
  private _node: string = "";
  private _address: string = "";
  private _credentialID: string = "";

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

  setContractAddress(contractAddress: string) {
    if (this._address !== contractAddress && isAddress(contractAddress)) {
      this._address = contractAddress;
      console.log("Contract address is changed : ", this._address);
    } else {
      console.error("This is invalid address type");
    }
  }

  setCredentialId(_credentialID: string) {
    if (this._credentialID !== _credentialID) {
      this._credentialID = _credentialID;
      console.log("Collection ID is changed : ", this._credentialID);
    } else {
      console.error("This is invalid collection ID type");
    }
  }

  getContractAddress(): string {
    return this._address.toString();
  }

  getCredentialId(): string {
    return this._credentialID.toString();
  }

  createCredential(): OperationType<Fact> {
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
