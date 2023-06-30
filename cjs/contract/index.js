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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
const validation_js_1 = require("../utils/validation.js");
const operation_js_1 = require("../types/operation.js");
const publicKey_js_1 = require("../account/publicKey.js");
const time_js_1 = require("../utils/time.js");
const key_js_1 = require("../account/key.js");
const index_js_1 = require("../operation/index.js");
const property_js_1 = require("../types/property.js");
const account_js_1 = require("./account.js");
const BTC = "btc";
const ETH = "ether";
class Contract {
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
    createWallet(sender, currencyID, amount, seed, weight = 100) {
        let keypair;
        if (seed === undefined) {
            keypair = key_js_1.M2KeyPair.random(BTC);
        }
        else {
            keypair = key_js_1.M2KeyPair.fromSeed(seed, BTC);
        }
        const wt = weight;
        const privatekey = keypair.privateKey.toString();
        const publickey = keypair.publicKey.toString();
        const address = this.pubToKeys([{ key: publickey, weight: wt }], wt).address.toString();
        const keys = this.pubToKeys([{ key: publickey, weight: wt }], wt);
        const amountArr = new property_js_1.Amount(currencyID, amount);
        const token = new time_js_1.TimeStamp().UTC();
        const item = new account_js_1.CreateContractAccountsItem(keys, [amountArr], BTC);
        const fact = new account_js_1.CreateContractAccountsFact(token, sender, [item]);
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
        const item = new account_js_1.CreateContractAccountsItem(keys, [amountArr], BTC);
        const fact = new account_js_1.CreateContractAccountsFact(token, senderAddr, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    createEtherAccount(senderAddr, receiverPub, currentID, amount) {
        const keys = this.pubToKeys([{ key: receiverPub, weight: 100 }], 100);
        const amountArr = new property_js_1.Amount(currentID, amount);
        const token = new time_js_1.TimeStamp().UTC();
        const item = new account_js_1.CreateContractAccountsItem(keys, [amountArr], ETH);
        const fact = new account_js_1.CreateContractAccountsFact(token, senderAddr, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    createMultiSig(senderAddr, receiverPubArr, currentID, amount, threshold) {
        const keys = this.pubToKeys(receiverPubArr, threshold);
        const amountArr = new property_js_1.Amount(currentID, amount);
        const token = new time_js_1.TimeStamp().UTC();
        const item = new account_js_1.CreateContractAccountsItem(keys, [amountArr], BTC);
        const fact = new account_js_1.CreateContractAccountsFact(token, senderAddr, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    createEtherMultiSig(senderAddr, receiverPubArr, currentID, amount, threshold) {
        const keys = this.pubToKeys(receiverPubArr, threshold);
        const amountArr = new property_js_1.Amount(currentID, amount);
        const token = new time_js_1.TimeStamp().UTC();
        const item = new account_js_1.CreateContractAccountsItem(keys, [amountArr], ETH);
        const fact = new account_js_1.CreateContractAccountsFact(token, senderAddr, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    pubToKeys(pubKeys, threshold) {
        const pubs = pubKeys.map((pub) => new publicKey_js_1.PubKey(pub.key, pub.weight));
        return new publicKey_js_1.Keys(pubs, threshold);
    }
}
exports.Contract = Contract;
//# sourceMappingURL=index.js.map