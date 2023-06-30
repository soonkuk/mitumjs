import { MITUM_NETWORK_ID } from "./intro.js";
import { Version, Node, Chain } from "./common/index.js";
import { Account } from "./account/index.js";
import { Currency } from "./currency/index.js";
import { Block } from "./block/index.js";
import { Operation } from "./operation/index.js";

import { AxiosResponse } from "axios";

import { Nft } from "./contract/nft/index.js";
// import { Timestamp } from "./contract/timestamp/index.js";

export class Mitum {
  private _version: Version;
  private _node: Node;
  private _chain: Chain;

  public account: Account;
  public currency: Currency;
  public block: Block;
  public operation: Operation;

  public nft: Nft;
  // public timestamp: Timestamp;

  public constructor(provider?: string) {
    this._version = new Version();
    this._node = new Node(provider);
    this._chain = new Chain(MITUM_NETWORK_ID);

    this.account = new Account(MITUM_NETWORK_ID, provider);
    this.currency = new Currency(MITUM_NETWORK_ID, provider);
    this.block = new Block(provider);
    this.operation = new Operation(provider);

    this.nft = new Nft(MITUM_NETWORK_ID, provider);
    // this.timestamp = new Timestamp(provider);
  }

  version(): string {
    return this._version.getVersion();
  }

  async node(): Promise<AxiosResponse> {
    return await this._node.getNodeInfo();
  }

  setNode(provider?: string) {
    const networkID = this.chain();

    this._node.setNode(provider);

    this.account = new Account(networkID, provider);
    this.currency = new Currency(networkID, provider);
    this.block = new Block(provider);
    this.operation = new Operation(provider);

    this.nft = new Nft(networkID, provider);
    // this.timestamp = new Timestamp(networkID, provider);
  }

  getNode(): string {
    return this._node.getNodeUri();
  }

  chain(): string {
    return this._chain.getChainID();
  }

  setChain(networkID: string) {
    const provider = this.getNode();

    this._chain.setChainID(networkID);

    this.account = new Account(networkID, provider);
    this.currency = new Currency(networkID, provider);

    this.nft = new Nft(networkID, provider);
    // this.timestamp = new Timestamp(networkID, provider);
  }
}

export default Mitum;
