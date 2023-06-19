"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const property_1 = require("../types/property");
const time_1 = require("../utils/time");
const create_1 = require("./create");
const random_1 = require("./random");
const publicKey_1 = require("./publicKey");
const key_1 = require("./key");
const operation_1 = require("../types/operation");
const keyUpdate_1 = require("./keyUpdate");
const BTC = "btc";
const ETH = "ether";
class Account {
    key(seed) {
        if (seed === undefined) {
            return key_1.M2KeyPair.random(BTC);
        }
        return key_1.M2KeyPair.fromSeed(seed, BTC);
    }
    keys(n) {
        return (0, random_1.M2RandomN)(n, BTC);
    }
    fromPrivateKey(key) {
        return key_1.M2KeyPair.fromPrivate(key);
    }
    etherKey(seed) {
        if (seed === undefined || seed.length === 0) {
            return key_1.M2KeyPair.random(ETH);
        }
        return key_1.M2KeyPair.fromSeed(seed, ETH);
    }
    etherKeys(n) {
        return (0, random_1.M2EtherRandomN)(n, ETH);
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
    create(senderAddr, recieverPub, currentID, amount) {
        const keys = this.pubToKeys([{ key: recieverPub, weight: 100 }], 100);
        const amountArr = new property_1.Amount(currentID, amount);
        const token = new time_1.TimeStamp().UTC();
        const item = new create_1.CreateAccountsItem(keys, [amountArr], BTC);
        const fact = new create_1.CreateAccountsFact(token, senderAddr, [item]);
        return new operation_1.OperationType(fact);
    }
    createEtherAccount(senderAddr, recieverPub, currentID, amount) {
        const keys = this.pubToKeys([{ key: recieverPub, weight: 100 }], 100);
        const amountArr = new property_1.Amount(currentID, amount);
        const token = new time_1.TimeStamp().UTC();
        const item = new create_1.CreateAccountsItem(keys, [amountArr], ETH);
        const fact = new create_1.CreateAccountsFact(token, senderAddr, [item]);
        return new operation_1.OperationType(fact);
    }
    createMultiSig(senderAddr, recieverPubArr, currentID, amount, threshold) {
        const keys = this.pubToKeys(recieverPubArr, threshold);
        const amountArr = new property_1.Amount(currentID, amount);
        const token = new time_1.TimeStamp().UTC();
        const item = new create_1.CreateAccountsItem(keys, [amountArr], BTC);
        const fact = new create_1.CreateAccountsFact(token, senderAddr, [item]);
        return new operation_1.OperationType(fact);
    }
    createEtherMultiSig(senderAddr, recieverPubArr, currentID, amount, threshold) {
        const keys = this.pubToKeys(recieverPubArr, threshold);
        const amountArr = new property_1.Amount(currentID, amount);
        const token = new time_1.TimeStamp().UTC();
        const item = new create_1.CreateAccountsItem(keys, [amountArr], ETH);
        const fact = new create_1.CreateAccountsFact(token, senderAddr, [item]);
        return new operation_1.OperationType(fact);
    }
    updateKey(targetAddr, newPubArr, currentID, threshold) {
        const keys = this.pubToKeys(newPubArr, threshold);
        const token = new time_1.TimeStamp().UTC();
        const fact = new keyUpdate_1.KeyUpdaterFact(token, targetAddr, keys, currentID);
        return new operation_1.OperationType(fact);
    }
    pubToKeys(pubKeys, threshold) {
        const pubs = pubKeys.map((pub) => new publicKey_1.PubKey(pub.key, pub.weight));
        return new publicKey_1.Keys(pubs, threshold);
    }
}
exports.Account = Account;
//# sourceMappingURL=index.js.map