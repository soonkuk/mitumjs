import { KeyPairType } from "../types/address";
import { Amount } from "../types/property";
import { TimeStamp } from "../utils/time";

import { CreateAccountsItem, CreateAccountsFact } from "./create";
import { M2RandomN, M2EtherRandomN } from "./random";
import { Key, Keys, PubKey } from "./publicKey";
import { KeyPair } from "./iPair";
import { M2KeyPair } from "./key";

import { Operation } from "../types/operation";
import { KeyUpdaterFact } from "./keyUpdate";
import { Fact } from "../types/fact";

const BTC: KeyPairType = "btc";
const ETH: KeyPairType = "ether";

export class Account {
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
    recieverPub: string,
    currentID: string,
    amount: number
  ): Operation<Fact> {
    const keys = this.pubToKeys([{ key: recieverPub, weight: 100 }], 100);
    const amountArr = new Amount(currentID, amount);

    const token = new TimeStamp().UTC();

    const item = new CreateAccountsItem(keys, [amountArr], BTC);
    const fact = new CreateAccountsFact(token, senderAddr, [item]);

    return new Operation(fact);
  }

  createEtherAccount(
    senderAddr: string,
    recieverPub: string,
    currentID: string,
    amount: number
  ): Operation<Fact> {
    const keys = this.pubToKeys([{ key: recieverPub, weight: 100 }], 100);
    const amountArr = new Amount(currentID, amount);

    const token = new TimeStamp().UTC();

    const item = new CreateAccountsItem(keys, [amountArr], ETH);
    const fact = new CreateAccountsFact(token, senderAddr, [item]);

    return new Operation(fact);
  }

  createMultiSig(
    senderAddr: string,
    recieverPubArr: Array<{ weight: number; key: string }>,
    currentID: string,
    amount: number,
    threshold: number
  ): Operation<Fact> {
    const keys = this.pubToKeys(recieverPubArr, threshold);
    const amountArr = new Amount(currentID, amount);

    const token = new TimeStamp().UTC();

    const item = new CreateAccountsItem(keys, [amountArr], BTC);
    const fact = new CreateAccountsFact(token, senderAddr, [item]);

    return new Operation(fact);
  }

  createEtherMultiSig(
    senderAddr: string,
    recieverPubArr: Array<{ weight: number; key: string }>,
    currentID: string,
    amount: number,
    threshold: number
  ): Operation<Fact> {
    const keys = this.pubToKeys(recieverPubArr, threshold);
    const amountArr = new Amount(currentID, amount);

    const token = new TimeStamp().UTC();

    const item = new CreateAccountsItem(keys, [amountArr], ETH);
    const fact = new CreateAccountsFact(token, senderAddr, [item]);

    return new Operation(fact);
  }

  updateKey(
    targetAddr: string,
    newPubArr: Array<{ weight: number; key: string }>,
    currentID: string,
    threshold: number
  ): Operation<Fact> {
    const keys = this.pubToKeys(newPubArr, threshold);

    const token = new TimeStamp().UTC();

    const fact = new KeyUpdaterFact(token, targetAddr, keys, currentID);

    return new Operation(fact);
  }

  private pubToKeys(
    pubKeys: Array<{ weight: number; key: string }>,
    threshold: number
  ): Keys {
    const pubs = pubKeys.map((pub) => new PubKey(pub.key, pub.weight));
    return new Keys(pubs, threshold);
  }
}
