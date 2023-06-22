import { OperationType } from "../types/operation.js";
import { KeyPairType } from "../types/address.js";
import { Amount } from "../types/property.js";
import { isIPAddress } from "../utils/validation.js";
import { TimeStamp } from "../utils/time.js";
import { Fact } from "../types/fact.js";

import { CreateAccountsItem, CreateAccountsFact } from "./create.js";
import { M2RandomN, M2EtherRandomN } from "./random.js";
import { Key, Keys, PubKey } from "./publicKey.js";
import { KeyUpdaterFact } from "./keyUpdate.js";
import accountInfo from "./information.js";
import { KeyPair } from "./iPair.js";
import { M2KeyPair } from "./key.js";

import { AxiosResponse } from "axios";

const BTC: KeyPairType = "btc";
const ETH: KeyPairType = "ether";

export class Account {
  private _node: string = "";

  constructor(provider?: string) {
    this._setNode(provider);
  }

  private _setNode(provider?: string) {
    if (isIPAddress(provider)) {
      this._node = provider as string;
    }
  }

  key(seed?: string): M2KeyPair {
    if (seed === undefined) {
      return M2KeyPair.random(BTC);
    }

    return M2KeyPair.fromSeed(seed, BTC);
  }

  keys(n: number): { keys: Keys; keypairs: KeyPair[] } {
    return M2RandomN(n, BTC);
  }

  fromPrivateKey(key: string | Key): M2KeyPair {
    return M2KeyPair.fromPrivate(key);
  }

  etherKey(seed?: string): M2KeyPair {
    if (seed === undefined || seed.length === 0) {
      return M2KeyPair.random(ETH);
    }

    return M2KeyPair.fromSeed(seed, ETH);
  }

  etherKeys(n: number): { keys: Keys; keypairs: KeyPair[] } {
    return M2EtherRandomN(n, ETH);
  }

  address(pubKey: string): string {
    const address = this.pubToKeys([{ key: pubKey, weight: 100 }], 100).address;
    return address.toString();
  }

  etherAddress(pubKey: string): string {
    const address = this.pubToKeys(
      [{ key: pubKey, weight: 100 }],
      100
    ).etherAddress;
    return address.toString();
  }

  addressForMultiSig(
    pubKeys: Array<{ key: string; weight: number }>,
    threshold: number
  ): string {
    const address = this.pubToKeys(pubKeys, threshold).address;
    return address.toString();
  }

  etherAddressForMultiSig(
    pubKeys: Array<{ weight: number; key: string }>,
    threshold: number
  ): string {
    const address = this.pubToKeys(pubKeys, threshold).etherAddress;
    return address.toString();
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

    const item = new CreateAccountsItem(keys, [amountArr], BTC);
    const fact = new CreateAccountsFact(token, senderAddr, [item]);

    return new OperationType(fact);
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

    const item = new CreateAccountsItem(keys, [amountArr], ETH);
    const fact = new CreateAccountsFact(token, senderAddr, [item]);

    return new OperationType(fact);
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

    const item = new CreateAccountsItem(keys, [amountArr], BTC);
    const fact = new CreateAccountsFact(token, senderAddr, [item]);

    return new OperationType(fact);
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

    const item = new CreateAccountsItem(keys, [amountArr], ETH);
    const fact = new CreateAccountsFact(token, senderAddr, [item]);

    return new OperationType(fact);
  }

  updateKey(
    targetAddr: string,
    newPubArr: Array<{ weight: number; key: string }>,
    currentID: string,
    threshold: number
  ): OperationType<Fact> {
    const keys = this.pubToKeys(newPubArr, threshold);

    const token = new TimeStamp().UTC();

    const fact = new KeyUpdaterFact(token, targetAddr, keys, currentID);

    return new OperationType(fact);
  }

  private pubToKeys(
    pubKeys: Array<{ weight: number; key: string }>,
    threshold: number
  ): Keys {
    const pubs = pubKeys.map((pub) => new PubKey(pub.key, pub.weight));
    return new Keys(pubs, threshold);
  }

  async get(address: string): Promise<AxiosResponse> {
    return await accountInfo.getAddressInfo(this._node, address);
  }

  async getOperation(address: string): Promise<AxiosResponse> {
    return await accountInfo.getOperationsByAddress(this._node, address);
  }

  async getByPublickey(publickey: string): Promise<AxiosResponse> {
    return await accountInfo.getAccountInfoByPublickey(this._node, publickey);
  }
}
