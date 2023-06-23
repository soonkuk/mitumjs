import { OperationType } from "../types/operation.js";
import { Amount } from "../types/property.js";
import { isIPAddress } from "../utils/validation.js";
import { TimeStamp } from "../utils/time.js";
import { CreateAccountsItem, CreateAccountsFact } from "./create.js";
import { M2RandomN, M2EtherRandomN } from "./random.js";
import { Keys, PubKey } from "./publicKey.js";
import { KeyUpdaterFact } from "./keyUpdate.js";
import accountInfo from "./information.js";
import { M2KeyPair } from "./key.js";
const BTC = "btc";
const ETH = "ether";
export class Account {
    constructor(provider) {
        this._node = "";
        this._setNode(provider);
    }
    _setNode(provider) {
        if (isIPAddress(provider)) {
            this._node = provider;
        }
    }
    key(seed) {
        if (seed === undefined) {
            return M2KeyPair.random(BTC);
        }
        return M2KeyPair.fromSeed(seed, BTC);
    }
    keys(n) {
        return M2RandomN(n, BTC);
    }
    fromPrivateKey(key) {
        return M2KeyPair.fromPrivate(key);
    }
    etherKey(seed) {
        if (seed === undefined || seed.length === 0) {
            return M2KeyPair.random(ETH);
        }
        return M2KeyPair.fromSeed(seed, ETH);
    }
    etherKeys(n) {
        return M2EtherRandomN(n, ETH);
    }
    address(pubKey) {
        const address = this.pubToKeys([{ key: pubKey, weight: 100 }], 100).address;
        return address.toString();
    }
    etherAddress(pubKey) {
        const address = this.pubToKeys([{ key: pubKey, weight: 100 }], 100).etherAddress;
        return address.toString();
    }
    addressForMultiSig(pubKeys, threshold) {
        const address = this.pubToKeys(pubKeys, threshold).address;
        return address.toString();
    }
    etherAddressForMultiSig(pubKeys, threshold) {
        const address = this.pubToKeys(pubKeys, threshold).etherAddress;
        return address.toString();
    }
    create(senderAddr, receiverPub, currentID, amount) {
        const keys = this.pubToKeys([{ key: receiverPub, weight: 100 }], 100);
        const amountArr = new Amount(currentID, amount);
        const token = new TimeStamp().UTC();
        const item = new CreateAccountsItem(keys, [amountArr], BTC);
        const fact = new CreateAccountsFact(token, senderAddr, [item]);
        return new OperationType(fact);
    }
    createEtherAccount(senderAddr, receiverPub, currentID, amount) {
        const keys = this.pubToKeys([{ key: receiverPub, weight: 100 }], 100);
        const amountArr = new Amount(currentID, amount);
        const token = new TimeStamp().UTC();
        const item = new CreateAccountsItem(keys, [amountArr], ETH);
        const fact = new CreateAccountsFact(token, senderAddr, [item]);
        return new OperationType(fact);
    }
    createMultiSig(senderAddr, receiverPubArr, currentID, amount, threshold) {
        const keys = this.pubToKeys(receiverPubArr, threshold);
        const amountArr = new Amount(currentID, amount);
        const token = new TimeStamp().UTC();
        const item = new CreateAccountsItem(keys, [amountArr], BTC);
        const fact = new CreateAccountsFact(token, senderAddr, [item]);
        return new OperationType(fact);
    }
    createEtherMultiSig(senderAddr, receiverPubArr, currentID, amount, threshold) {
        const keys = this.pubToKeys(receiverPubArr, threshold);
        const amountArr = new Amount(currentID, amount);
        const token = new TimeStamp().UTC();
        const item = new CreateAccountsItem(keys, [amountArr], ETH);
        const fact = new CreateAccountsFact(token, senderAddr, [item]);
        return new OperationType(fact);
    }
    update(targetAddr, newPubArr, currentID) {
        const key = this.pubToKeys([{ key: newPubArr, weight: 100 }], 100);
        const token = new TimeStamp().UTC();
        const fact = new KeyUpdaterFact(token, targetAddr, key, currentID);
        return new OperationType(fact);
    }
    updateMultiSig(targetAddr, newPubArr, currentID, threshold) {
        const keys = this.pubToKeys(newPubArr, threshold);
        const token = new TimeStamp().UTC();
        const fact = new KeyUpdaterFact(token, targetAddr, keys, currentID);
        return new OperationType(fact);
    }
    pubToKeys(pubKeys, threshold) {
        const pubs = pubKeys.map((pub) => new PubKey(pub.key, pub.weight));
        return new Keys(pubs, threshold);
    }
    async get(address) {
        return await accountInfo.getAddressInfo(this._node, address);
    }
    async getOperation(address) {
        return await accountInfo.getOperationsByAddress(this._node, address);
    }
    async getByPublickey(publickey) {
        return await accountInfo.getAccountInfoByPublickey(this._node, publickey);
    }
}
//# sourceMappingURL=index.js.map