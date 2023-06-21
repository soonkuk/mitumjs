"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const operation_1 = require("../types/operation");
const property_1 = require("../types/property");
const validation_1 = require("../utils/validation");
const time_1 = require("../utils/time");
const create_1 = require("./create");
const random_1 = require("./random");
const publicKey_1 = require("./publicKey");
const keyUpdate_1 = require("./keyUpdate");
const information_1 = __importDefault(require("./information"));
const key_1 = require("./key");
const BTC = "btc";
const ETH = "ether";
class Account {
    constructor(provider) {
        this._node = "";
        this._setNode(provider);
    }
    _setNode(provider) {
        if ((0, validation_1.isIPAddress)(provider)) {
            this._node = provider;
        }
    }
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
    get(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield information_1.default.getAddressInfo(this._node, address);
        });
    }
    getOperation(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield information_1.default.getOperationsByAddress(this._node, address);
        });
    }
    getByPublickey(publickey) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield information_1.default.getAccountInfoByPublickey(this._node, publickey);
        });
    }
}
exports.Account = Account;
//# sourceMappingURL=index.js.map