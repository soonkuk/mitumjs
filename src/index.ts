import { Version, Node, Chain } from "./common/index.js";
import { Account } from "./account/index.js";
import { Currency } from "./currency/index.js";
import { Block } from "./block/index.js";
import { Contract } from "./contract/index.js";
import { Operation } from "./operation/index.js";
import { AxiosResponse } from "axios";

export class Mitum {
  private _version: Version;
  private _node: Node;
  private _chain: Chain;

  public account: Account;
  public currency: Currency;
  public block: Block;
  public contract: Contract;
  public operation: Operation;

  public constructor(provider?: string) {
    this._version = new Version();
    this._node = new Node(provider);
    this._chain = new Chain();

    this.account = new Account(provider);
    this.currency = new Currency(provider);
    this.block = new Block(provider);
    this.contract = new Contract();
    this.operation = new Operation(provider);
  }

  version(): string {
    return this._version.getVersion();
  }

  node(): Promise<AxiosResponse<any, any>> {
    return this._node.getNodeInfo();
  }

  setNode(provider?: string) {
    this._node.setNode(provider);

    this.account = new Account(provider);
    this.currency = new Currency(provider);
    this.block = new Block(provider);
    this.operation = new Operation(provider);
  }

  getNode(): string {
    return this._node.getNodeUri();
  }

  chain(): string {
    return this._chain.getChainID();
  }

  setChain(cID: string) {
    this._chain.setChainID(cID);
  }
}

export default Mitum;
