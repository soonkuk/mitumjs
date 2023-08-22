import { OperationType } from "../types/operation.js";
import { KeyPairType } from "../types/address.js";
import { Amount } from "../types/property.js";
import { isIPAddress } from "../utils/validation.js";
import { TimeStamp } from "../utils/time.js";
import { Fact } from "../types/fact.js";

import { CreateAccountsItem, CreateAccountsFact } from "./create.js";
import { M2RandomN, M2EtherRandomN } from "./random.js";
import { EtherKeys, Key, Keys, PubKey } from "./publicKey.js";
import { Operation } from "../operation/index.js";
import { WalletType } from "../types/wallet.js";
import { KeyUpdaterFact } from "./keyUpdate.js";
import accountInfo from "./information.js";
import { M2KeyPair } from "./key.js";

import { AxiosResponse } from "axios";

// const BTC: KeyPairType = "btc";
const MITUM: KeyPairType = "mitum";
const ETH: KeyPairType = "ether";

export class Account {
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

  key(seed?: string): WalletType {
    let keyInfo: M2KeyPair;
    if (seed === undefined) {
      keyInfo = M2KeyPair.random(MITUM);
      return <WalletType>{
        privatekey: keyInfo.privateKey.toString(),
        publickey: keyInfo.publicKey.toString(),
        address: this.address(keyInfo.publicKey.toString()),
      };
    }

    keyInfo = M2KeyPair.fromSeed(seed, MITUM);
    return <WalletType>{
      privatekey: keyInfo.privateKey.toString(),
      publickey: keyInfo.publicKey.toString(),
      address: this.address(keyInfo.publicKey.toString()),
    };
  }

  keys(n: number): Array<WalletType> {
    const keypairs = M2RandomN(n, MITUM).keypairs;

    const keysInfo = keypairs.map((keypair) => {
      return <WalletType>{
        privatekey: keypair.privateKey.toString(),
        publickey: keypair.publicKey.toString(),
        address: this.address(keypair.publicKey.toString()),
      };
    });
    return keysInfo;
  }

  fromPrivateKey(key: string | Key): WalletType {
    const keyInfo = M2KeyPair.fromPrivate(key);

    const type = keyInfo.privateKey.type;

    if (type == MITUM) {
      return <WalletType>{
        privatekey: keyInfo.privateKey.toString(),
        publickey: keyInfo.publicKey.toString(),
        address: this.address(keyInfo.publicKey.toString()),
      };
    }

    return <WalletType>{
      privatekey: keyInfo.privateKey.toString(),
      publickey: keyInfo.publicKey.toString(),
      address: this.etherAddress(keyInfo.publicKey.toString()),
    };
  }

  etherKey(seed?: string): WalletType {
    let keyInfo: M2KeyPair;
    if (seed === undefined || seed.length === 0) {
      keyInfo = M2KeyPair.random(ETH);
      return <WalletType>{
        privatekey: keyInfo.privateKey.toString(),
        publickey: keyInfo.publicKey.toString(),
        address: this.etherAddress(keyInfo.publicKey.toString()),
      };
    }

    keyInfo = M2KeyPair.fromSeed(seed, ETH);
    return <WalletType>{
      privatekey: keyInfo.privateKey.toString(),
      publickey: keyInfo.publicKey.toString(),
      address: this.etherAddress(keyInfo.publicKey.toString()),
    };
  }

  etherKeys(n: number): Array<WalletType> {
    const keypairs = M2EtherRandomN(n, ETH).keypairs;

    const keysInfo = keypairs.map((keypair) => {
      return <WalletType>{
        privatekey: keypair.privateKey.toString(),
        publickey: keypair.publicKey.toString(),
        address: this.etherAddress(keypair.publicKey.toString()),
      };
    });
    return keysInfo;
  }

  address(pubKey: string): string {
    const address = this.pubToKeys([{ key: pubKey, weight: 100 }], 100).address;

    return address.toString();
  }

  etherAddress(pubKey: string): string {
    const address = this.ethPubToKeys(
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
    const address = this.ethPubToKeys(pubKeys, threshold).etherAddress;
    return address.toString();
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
      keypair = M2KeyPair.random(MITUM);
    } else {
      keypair = M2KeyPair.fromSeed(seed, MITUM);
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

    const item = new CreateAccountsItem(keys, [amountArr], MITUM);
    const fact = new CreateAccountsFact(token, sender, [item]);

    return {
      wallet: <WalletType>{ privatekey, publickey, address },
      operation: new OperationType(this._networkID, fact),
    };
  }

  async touch(
    privatekey: string,
    wallet: { wallet: WalletType; operation: OperationType<Fact> }
  ): Promise<AxiosResponse> {
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

    const item = new CreateAccountsItem(keys, [amountArr], MITUM);
    const fact = new CreateAccountsFact(token, senderAddr, [item]);

    return new OperationType(this._networkID, fact);
  }

  createEtherAccount(
    senderAddr: string,
    receiverPub: string,
    currentID: string,
    amount: number
  ): OperationType<Fact> {
    const keys = this.ethPubToKeys([{ key: receiverPub, weight: 100 }], 100);

    const amountArr = new Amount(currentID, amount);

    const token = new TimeStamp().UTC();

    const item = new CreateAccountsItem(keys, [amountArr], ETH);
    const fact = new CreateAccountsFact(token, senderAddr, [item]);

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

    const item = new CreateAccountsItem(keys, [amountArr], MITUM);
    const fact = new CreateAccountsFact(token, senderAddr, [item]);

    return new OperationType(this._networkID, fact);
  }

  createEtherMultiSig(
    senderAddr: string,
    receiverPubArr: Array<{ weight: number; key: string }>,
    currentID: string,
    amount: number,
    threshold: number
  ): OperationType<Fact> {
    const keys = this.ethPubToKeys(receiverPubArr, threshold);
    const amountArr = new Amount(currentID, amount);

    const token = new TimeStamp().UTC();

    const item = new CreateAccountsItem(keys, [amountArr], ETH);
    const fact = new CreateAccountsFact(token, senderAddr, [item]);

    return new OperationType(this._networkID, fact);
  }

  update(
    targetAddr: string,
    newPubArr: string,
    currentID: string
  ): OperationType<Fact> {
    const suffix = targetAddr.slice(-3);

    let key: Keys | EtherKeys;
    if (suffix === "mca") {
      key = this.pubToKeys([{ key: newPubArr, weight: 100 }], 100);
    } else if (suffix === "eca") {
      key = this.ethPubToKeys([{ key: newPubArr, weight: 100 }], 100);
    } else {
      throw new Error("The target address is invalid-type");
    }

    const token = new TimeStamp().UTC();

    const fact = new KeyUpdaterFact(token, targetAddr, key, currentID);

    return new OperationType(this._networkID, fact);
  }

  updateMultiSig(
    targetAddr: string,
    newPubArr: Array<{ weight: number; key: string }>,
    currentID: string,
    threshold: number
  ): OperationType<Fact> {
    const suffix = targetAddr.slice(-3);

    let keys: Keys | EtherKeys;
    if (suffix === "mca") {
      keys = this.pubToKeys(newPubArr, threshold);
    } else if (suffix === "eca") {
      keys = this.ethPubToKeys(newPubArr, threshold);
    } else {
      throw new Error("The target address is invalid-type");
    }

    const token = new TimeStamp().UTC();

    const fact = new KeyUpdaterFact(token, targetAddr, keys, currentID);

    return new OperationType(this._networkID, fact);
  }

  private pubToKeys(
    pubKeys: Array<{ weight: number; key: string }>,
    threshold: number
  ): Keys {
    const pubs = pubKeys.map((pub) => new PubKey(pub.key, pub.weight));
    return new Keys(pubs, threshold);
  }

  private ethPubToKeys(
    pubKeys: Array<{ weight: number; key: string }>,
    threshold: number
  ): EtherKeys {
    const pubs = pubKeys.map((pub) => new PubKey(pub.key, pub.weight));
    return new EtherKeys(pubs, threshold);
  }

  async getAccountInfo(address: string): Promise<AxiosResponse> {
    return await accountInfo.getAddressInfo(this._node, address);
  }

  async getOperation(address: string): Promise<AxiosResponse> {
    return await accountInfo.getOperationsByAddress(this._node, address);
  }

  async getByPublickey(publickey: string): Promise<AxiosResponse> {
    return await accountInfo.getAccountInfoByPublickey(this._node, publickey);
  }

  async balance(address: string): Promise<AxiosResponse> {
    const info = await accountInfo.getAddressInfo(this._node, address);
    return info.data._embedded.balance;
  }
}
