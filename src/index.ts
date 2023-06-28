import { Version, Node, Chain } from "./common/index.js";
import { Account } from "./account/index.js";
import { Currency } from "./currency/index.js";
import { Block } from "./block/index.js";
import { Operation } from "./operation/index.js";
import { AxiosResponse } from "axios";

import { Nft } from "./contract/nft/index.js";

export class Mitum {
  private _version: Version;
  private _node: Node;
  private _chain: Chain;

  public account: Account;
  public currency: Currency;
  public block: Block;
  public operation: Operation;

  public nft: Nft;

  public constructor(provider?: string) {
    this._version = new Version();
    this._node = new Node(provider);
    this._chain = new Chain();

    this.account = new Account(provider);
    this.currency = new Currency(provider);
    this.block = new Block(provider);
    this.operation = new Operation(provider);

    this.nft = new Nft(provider);
  }

  version(): string {
    return this._version.getVersion();
  }

  async node(): Promise<AxiosResponse<any, any>> {
    return await this._node.getNodeInfo();
  }

  setNode(provider?: string) {
    this._node.setNode(provider);

    this.account = new Account(provider);
    this.currency = new Currency(provider);
    this.block = new Block(provider);
    this.operation = new Operation(provider);

    this.nft = new Nft(provider);
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
