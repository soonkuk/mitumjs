import { Version, Node, Chain } from "./common";
import { Account } from "./account";
import { Currency } from "./currency";
import { Block } from "./block";
import { Contract } from "./contract";
// import { Operation } from "./operation";
import { AxiosResponse } from "axios";

export class Mitum {
  private _version: Version;
  private _node: Node;
  private _chain: Chain;

  public account: Account;
  public currency: Currency;
  public block: Block;
  public contract: Contract;
  // public operation: Operation;

  public constructor(provider?: string) {
    this._version = new Version();
    this._node = new Node(provider);
    this._chain = new Chain();

    this.account = new Account();
    this.currency = new Currency(provider);
    this.block = new Block();
    this.contract = new Contract();
    // this.operation = new Operation(provider);
  }

  version(): string {
    return this._version.getVersion();
  }

  node(): Promise<AxiosResponse<any, any>> {
    return this._node.getNodeInfo();
  }

  setNode(provider?: string) {
    this._node.setNode(provider);

    this.currency = new Currency(provider);
    // this.operation = new Operation(provider);
  }

  getNode(): string {
    return this._node.getNodeUri();
  }

  chain(): string {
    return this._chain.getChainID();
  }

  setChain(url: string) {
    this._chain.setChainID(url);
  }
}

export default Mitum;
