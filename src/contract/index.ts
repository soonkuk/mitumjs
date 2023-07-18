import { KeyPairType } from "../types/address.js";
import { isIPAddress } from "../utils/validation.js";
import { WalletType } from "../types/wallet.js";
import { OperationType } from "../types/operation.js";
import { Fact } from "../types/fact.js";
import { Keys, PubKey } from "../account/publicKey.js";
import { TimeStamp } from "../utils/time.js";
import { M2KeyPair } from "../account/key.js";
import { Operation } from "../operation/index.js";
import { AxiosResponse } from "axios";
import { Amount } from "../types/property.js";
import accountInfo from "../account/information.js";

import {
  CreateContractAccountsItem,
  CreateContractAccountsFact,
} from "./account.js";

const BTC: KeyPairType = "btc";
const ETH: KeyPairType = "ether";

export class Contract {
  private _networkID: string = "";
  private _node: string = "";

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

  createWallet(
    sender: string,
    currencyID: string,
    amount: number,
    seed?: string,
    weight: number = 100
  ): { wallet: WalletType; operation: OperationType<Fact> } {
    let keypair: M2KeyPair;

    if (seed === undefined || typeof seed === "number") {
      keypair = M2KeyPair.random(BTC);
    } else {
      keypair = M2KeyPair.fromSeed(seed, BTC);
    }

    let wt = weight;
    if (typeof seed === "number") {
      wt = seed;
    }

    const privatekey = keypair.privateKey.toString();
    const publickey = keypair.publicKey.toString();
    const address = this.pubToKeys(
      [{ key: publickey, weight: wt }],
      wt
    ).address.toString();

    const keys = this.pubToKeys([{ key: publickey, weight: wt }], wt);
    const amountArr = new Amount(currencyID, amount);

    const token = new TimeStamp().UTC();

    const item = new CreateContractAccountsItem(keys, [amountArr], BTC);
    const fact = new CreateContractAccountsFact(token, sender, [item]);

    return {
      wallet: <WalletType>{ privatekey, publickey, address },
      operation: new OperationType(this._networkID, fact),
    };
  }

  async touch(
    privatekey: string,
    wallet: { wallet: WalletType; operation: OperationType<Fact> }
  ): Promise<AxiosResponse | null> {
    const oper = new Operation(this._node);
    const signedOperation = oper.sign(privatekey, wallet.operation);
    const res = await oper.send(signedOperation);
    return res.data;
  }

  create(
    senderAddr: string,
    receiverPub: string,
    currentID: string,
    amount: number
  ): OperationType<Fact> {
    const keys = this.pubToKeys([{ key: receiverPub, weight: 100 }], 100);
    const amountArr = new Amount(currentID, amount);

    const token = new TimeStamp().UTC();

    const item = new CreateContractAccountsItem(keys, [amountArr], BTC);
    const fact = new CreateContractAccountsFact(token, senderAddr, [item]);

    return new OperationType(this._networkID, fact);
  }

  createEtherAccount(
    senderAddr: string,
    receiverPub: string,
    currentID: string,
    amount: number
  ): OperationType<Fact> {
    const keys = this.pubToKeys([{ key: receiverPub, weight: 100 }], 100);
    const amountArr = new Amount(currentID, amount);

    const token = new TimeStamp().UTC();

    const item = new CreateContractAccountsItem(keys, [amountArr], ETH);
    const fact = new CreateContractAccountsFact(token, senderAddr, [item]);

    return new OperationType(this._networkID, fact);
  }

  createMultiSig(
    senderAddr: string,
    receiverPubArr: Array<{ weight: number; key: string }>,
    currentID: string,
    amount: number,
    threshold: number
  ): OperationType<Fact> {
    const keys = this.pubToKeys(receiverPubArr, threshold);
    const amountArr = new Amount(currentID, amount);

    const token = new TimeStamp().UTC();

    const item = new CreateContractAccountsItem(keys, [amountArr], BTC);
    const fact = new CreateContractAccountsFact(token, senderAddr, [item]);

    return new OperationType(this._networkID, fact);
  }

  createEtherMultiSig(
    senderAddr: string,
    receiverPubArr: Array<{ weight: number; key: string }>,
    currentID: string,
    amount: number,
    threshold: number
  ): OperationType<Fact> {
    const keys = this.pubToKeys(receiverPubArr, threshold);
    const amountArr = new Amount(currentID, amount);

    const token = new TimeStamp().UTC();

    const item = new CreateContractAccountsItem(keys, [amountArr], ETH);
    const fact = new CreateContractAccountsFact(token, senderAddr, [item]);

    return new OperationType(this._networkID, fact);
  }

  private pubToKeys(
    pubKeys: Array<{ weight: number; key: string }>,
    threshold: number
  ): Keys {
    const pubs = pubKeys.map((pub) => new PubKey(pub.key, pub.weight));
    return new Keys(pubs, threshold);
  }

  async getContractInfo(address: string): Promise<AxiosResponse | null> {
    return await accountInfo.getAddressInfo(this._node, address);
  }
}
