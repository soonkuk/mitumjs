var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { OperationType } from "../types/operation";
import { Amount } from "../types/property";
import { isIPAddress } from "../utils/validation";
import { TimeStamp } from "../utils/time";
import { CreateAccountsItem, CreateAccountsFact } from "./create";
import { M2RandomN, M2EtherRandomN } from "./random";
import { Keys, PubKey } from "./publicKey";
import { KeyUpdaterFact } from "./keyUpdate";
import accountInfo from "./information";
import { M2KeyPair } from "./key";
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
    create(senderAddr, recieverPub, currentID, amount) {
        const keys = this.pubToKeys([{ key: recieverPub, weight: 100 }], 100);
        const amountArr = new Amount(currentID, amount);
        const token = new TimeStamp().UTC();
        const item = new CreateAccountsItem(keys, [amountArr], BTC);
        const fact = new CreateAccountsFact(token, senderAddr, [item]);
        return new OperationType(fact);
    }
    createEtherAccount(senderAddr, recieverPub, currentID, amount) {
        const keys = this.pubToKeys([{ key: recieverPub, weight: 100 }], 100);
        const amountArr = new Amount(currentID, amount);
        const token = new TimeStamp().UTC();
        const item = new CreateAccountsItem(keys, [amountArr], ETH);
        const fact = new CreateAccountsFact(token, senderAddr, [item]);
        return new OperationType(fact);
    }
    createMultiSig(senderAddr, recieverPubArr, currentID, amount, threshold) {
        const keys = this.pubToKeys(recieverPubArr, threshold);
        const amountArr = new Amount(currentID, amount);
        const token = new TimeStamp().UTC();
        const item = new CreateAccountsItem(keys, [amountArr], BTC);
        const fact = new CreateAccountsFact(token, senderAddr, [item]);
        return new OperationType(fact);
    }
    createEtherMultiSig(senderAddr, recieverPubArr, currentID, amount, threshold) {
        const keys = this.pubToKeys(recieverPubArr, threshold);
        const amountArr = new Amount(currentID, amount);
        const token = new TimeStamp().UTC();
        const item = new CreateAccountsItem(keys, [amountArr], ETH);
        const fact = new CreateAccountsFact(token, senderAddr, [item]);
        return new OperationType(fact);
    }
    updateKey(targetAddr, newPubArr, currentID, threshold) {
        const keys = this.pubToKeys(newPubArr, threshold);
        const token = new TimeStamp().UTC();
        const fact = new KeyUpdaterFact(token, targetAddr, keys, currentID);
        return new OperationType(fact);
    }
    pubToKeys(pubKeys, threshold) {
        const pubs = pubKeys.map((pub) => new PubKey(pub.key, pub.weight));
        return new Keys(pubs, threshold);
    }
    get(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield accountInfo.getAddressInfo(this._node, address);
        });
    }
    getOperation(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield accountInfo.getOperationsByAddress(this._node, address);
        });
    }
    getByPublickey(publickey) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield accountInfo.getAccountInfoByPublickey(this._node, publickey);
        });
    }
}
//# sourceMappingURL=index.js.map