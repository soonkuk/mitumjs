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
const operation_js_1 = require("../types/operation.js");
const property_js_1 = require("../types/property.js");
const validation_js_1 = require("../utils/validation.js");
const time_js_1 = require("../utils/time.js");
const create_js_1 = require("./create.js");
const random_js_1 = require("./random.js");
const publicKey_js_1 = require("./publicKey.js");
const index_js_1 = require("../operation/index.js");
const keyUpdate_js_1 = require("./keyUpdate.js");
const information_js_1 = __importDefault(require("./information.js"));
const key_js_1 = require("./key.js");
const BTC = "btc";
const ETH = "ether";
class Account {
    constructor(networkID, provider) {
        this._networkID = "";
        this._node = "";
        this._setNode(provider);
        this._setChain(networkID);
    }
    _setNode(provider) {
        if ((0, validation_js_1.isIPAddress)(provider)) {
            this._node = provider;
        }
    }
    _setChain(networkID) {
        this._networkID = networkID;
    }
    key(seed) {
        if (seed === undefined) {
            return key_js_1.M2KeyPair.random(BTC);
        }
        return key_js_1.M2KeyPair.fromSeed(seed, BTC);
    }
    keys(n) {
        return (0, random_js_1.M2RandomN)(n, BTC);
    }
    fromPrivateKey(key) {
        return key_js_1.M2KeyPair.fromPrivate(key);
    }
    etherKey(seed) {
        if (seed === undefined || seed.length === 0) {
            return key_js_1.M2KeyPair.random(ETH);
        }
        return key_js_1.M2KeyPair.fromSeed(seed, ETH);
    }
    etherKeys(n) {
        return (0, random_js_1.M2EtherRandomN)(n, ETH);
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
    createWallet(sender, currencyID, amount, seed, weight = 100) {
        let keypair;
        if (seed === undefined || typeof seed === "number") {
            keypair = key_js_1.M2KeyPair.random(BTC);
        }
        else {
            keypair = key_js_1.M2KeyPair.fromSeed(seed, BTC);
        }
        let wt = weight;
        if (typeof seed === "number") {
            wt = seed;
        }
        const privatekey = keypair.privateKey.toString();
        const publickey = keypair.publicKey.toString();
        const address = this.pubToKeys([{ key: publickey, weight: wt }], wt).address.toString();
        const keys = this.pubToKeys([{ key: publickey, weight: wt }], wt);
        const amountArr = new property_js_1.Amount(currencyID, amount);
        const token = new time_js_1.TimeStamp().UTC();
        const item = new create_js_1.CreateAccountsItem(keys, [amountArr], BTC);
        const fact = new create_js_1.CreateAccountsFact(token, sender, [item]);
        return {
            wallet: { privatekey, publickey, address },
            operation: new operation_js_1.OperationType(this._networkID, fact),
        };
    }
    touch(privatekey, wallet) {
        return __awaiter(this, void 0, void 0, function* () {
            const oper = new index_js_1.Operation(this._node);
            const signedOperation = oper.sign(privatekey, wallet.operation);
            const res = yield oper.send(signedOperation);
            return res.data;
        });
    }
    create(senderAddr, receiverPub, currentID, amount) {
        const keys = this.pubToKeys([{ key: receiverPub, weight: 100 }], 100);
        const amountArr = new property_js_1.Amount(currentID, amount);
        const token = new time_js_1.TimeStamp().UTC();
        const item = new create_js_1.CreateAccountsItem(keys, [amountArr], BTC);
        const fact = new create_js_1.CreateAccountsFact(token, senderAddr, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    createEtherAccount(senderAddr, receiverPub, currentID, amount) {
        const keys = this.pubToKeys([{ key: receiverPub, weight: 100 }], 100);
        const amountArr = new property_js_1.Amount(currentID, amount);
        const token = new time_js_1.TimeStamp().UTC();
        const item = new create_js_1.CreateAccountsItem(keys, [amountArr], ETH);
        const fact = new create_js_1.CreateAccountsFact(token, senderAddr, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    createMultiSig(senderAddr, receiverPubArr, currentID, amount, threshold) {
        const keys = this.pubToKeys(receiverPubArr, threshold);
        const amountArr = new property_js_1.Amount(currentID, amount);
        const token = new time_js_1.TimeStamp().UTC();
        const item = new create_js_1.CreateAccountsItem(keys, [amountArr], BTC);
        const fact = new create_js_1.CreateAccountsFact(token, senderAddr, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    createEtherMultiSig(senderAddr, receiverPubArr, currentID, amount, threshold) {
        const keys = this.pubToKeys(receiverPubArr, threshold);
        const amountArr = new property_js_1.Amount(currentID, amount);
        const token = new time_js_1.TimeStamp().UTC();
        const item = new create_js_1.CreateAccountsItem(keys, [amountArr], ETH);
        const fact = new create_js_1.CreateAccountsFact(token, senderAddr, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    update(targetAddr, newPubArr, currentID) {
        const key = this.pubToKeys([{ key: newPubArr, weight: 100 }], 100);
        const token = new time_js_1.TimeStamp().UTC();
        const fact = new keyUpdate_js_1.KeyUpdaterFact(token, targetAddr, key, currentID);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    updateMultiSig(targetAddr, newPubArr, currentID, threshold) {
        const keys = this.pubToKeys(newPubArr, threshold);
        const token = new time_js_1.TimeStamp().UTC();
        const fact = new keyUpdate_js_1.KeyUpdaterFact(token, targetAddr, keys, currentID);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    pubToKeys(pubKeys, threshold) {
        const pubs = pubKeys.map((pub) => new publicKey_js_1.PubKey(pub.key, pub.weight));
        return new publicKey_js_1.Keys(pubs, threshold);
    }
    getAccountInfo(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield information_js_1.default.getAddressInfo(this._node, address);
        });
    }
    getOperation(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield information_js_1.default.getOperationsByAddress(this._node, address);
        });
    }
    getByPublickey(publickey) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield information_js_1.default.getAccountInfoByPublickey(this._node, publickey);
        });
    }
    balance(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield information_js_1.default.getAddressInfo(this._node, address);
            if (info) {
                return info.data._embedded.balance;
            }
            return null;
        });
    }
}
exports.Account = Account;
//# sourceMappingURL=index.js.map