import { OperationType } from "../types/operation.js";
import { Amount } from "../types/property.js";
import { isIPAddress } from "../utils/validation.js";
import { TimeStamp } from "../utils/time.js";
import { CreateAccountsItem, CreateAccountsFact } from "./create.js";
import { M2RandomN, M2EtherRandomN } from "./random.js";
import { EtherKeys, Keys, PubKey } from "./publicKey.js";
import { Operation } from "../operation/index.js";
import { KeyUpdaterFact } from "./keyUpdate.js";
import accountInfo from "./information.js";
import { M2KeyPair } from "./key.js";
// const BTC: KeyPairType = "btc";
const MITUM = "mitum";
const ETH = "ether";
export class Account {
    constructor(networkID, provider) {
        this._networkID = "";
        this._node = "";
        this._setNode(provider);
        this._setChain(networkID);
    }
    _setNode(provider) {
        if (isIPAddress(provider)) {
            this._node = provider;
        }
    }
    _setChain(networkID) {
        this._networkID = networkID;
    }
    key(seed) {
        let keyInfo;
        if (seed === undefined) {
            keyInfo = M2KeyPair.random(MITUM);
            return {
                privatekey: keyInfo.privateKey.toString(),
                publickey: keyInfo.publicKey.toString(),
                address: this.address(keyInfo.publicKey.toString()),
            };
        }
        keyInfo = M2KeyPair.fromSeed(seed, MITUM);
        return {
            privatekey: keyInfo.privateKey.toString(),
            publickey: keyInfo.publicKey.toString(),
            address: this.address(keyInfo.publicKey.toString()),
        };
    }
    keys(n) {
        const keypairs = M2RandomN(n, MITUM).keypairs;
        const keysInfo = keypairs.map((keypair) => {
            return {
                privatekey: keypair.privateKey.toString(),
                publickey: keypair.publicKey.toString(),
                address: this.address(keypair.publicKey.toString()),
            };
        });
        return keysInfo;
    }
    fromPrivateKey(key) {
        const keyInfo = M2KeyPair.fromPrivate(key);
        const type = keyInfo.privateKey.type;
        if (type == MITUM) {
            return {
                privatekey: keyInfo.privateKey.toString(),
                publickey: keyInfo.publicKey.toString(),
                address: this.address(keyInfo.publicKey.toString()),
            };
        }
        return {
            privatekey: keyInfo.privateKey.toString(),
            publickey: keyInfo.publicKey.toString(),
            address: this.etherAddress(keyInfo.publicKey.toString()),
        };
    }
    etherKey(seed) {
        let keyInfo;
        if (seed === undefined || seed.length === 0) {
            keyInfo = M2KeyPair.random(ETH);
            return {
                privatekey: keyInfo.privateKey.toString(),
                publickey: keyInfo.publicKey.toString(),
                address: this.etherAddress(keyInfo.publicKey.toString()),
            };
        }
        keyInfo = M2KeyPair.fromSeed(seed, ETH);
        return {
            privatekey: keyInfo.privateKey.toString(),
            publickey: keyInfo.publicKey.toString(),
            address: this.etherAddress(keyInfo.publicKey.toString()),
        };
    }
    etherKeys(n) {
        const keypairs = M2EtherRandomN(n, ETH).keypairs;
        const keysInfo = keypairs.map((keypair) => {
            return {
                privatekey: keypair.privateKey.toString(),
                publickey: keypair.publicKey.toString(),
                address: this.etherAddress(keypair.publicKey.toString()),
            };
        });
        return keysInfo;
    }
    address(pubKey) {
        const address = this.pubToKeys([{ key: pubKey, weight: 100 }], 100).address;
        return address.toString();
    }
    etherAddress(pubKey) {
        const address = this.ethPubToKeys([{ key: pubKey, weight: 100 }], 100).etherAddress;
        return address.toString();
    }
    addressForMultiSig(pubKeys, threshold) {
        const address = this.pubToKeys(pubKeys, threshold).address;
        return address.toString();
    }
    etherAddressForMultiSig(pubKeys, threshold) {
        const address = this.ethPubToKeys(pubKeys, threshold).etherAddress;
        return address.toString();
    }
    createWallet(sender, currencyID, amount, seed, weight = 100) {
        let keypair;
        if (seed === undefined || typeof seed === "number") {
            keypair = M2KeyPair.random(MITUM);
        }
        else {
            keypair = M2KeyPair.fromSeed(seed, MITUM);
        }
        let wt = weight;
        if (typeof seed === "number") {
            wt = seed;
        }
        const privatekey = keypair.privateKey.toString();
        const publickey = keypair.publicKey.toString();
        const address = this.pubToKeys([{ key: publickey, weight: wt }], wt).address.toString();
        const keys = this.pubToKeys([{ key: publickey, weight: wt }], wt);
        const amountArr = new Amount(currencyID, amount);
        const token = new TimeStamp().UTC();
        const item = new CreateAccountsItem(keys, [amountArr], MITUM);
        const fact = new CreateAccountsFact(token, sender, [item]);
        return {
            wallet: { privatekey, publickey, address },
            operation: new OperationType(this._networkID, fact),
        };
    }
    async touch(privatekey, wallet) {
        const oper = new Operation(this._node);
        const signedOperation = oper.sign(privatekey, wallet.operation);
        const res = await oper.send(signedOperation);
        return res.data;
    }
    create(senderAddr, receiverPub, currentID, amount) {
        const keys = this.pubToKeys([{ key: receiverPub, weight: 100 }], 100);
        const amountArr = new Amount(currentID, amount);
        const token = new TimeStamp().UTC();
        const item = new CreateAccountsItem(keys, [amountArr], MITUM);
        const fact = new CreateAccountsFact(token, senderAddr, [item]);
        return new OperationType(this._networkID, fact);
    }
    createEtherAccount(senderAddr, receiverPub, currentID, amount) {
        const keys = this.ethPubToKeys([{ key: receiverPub, weight: 100 }], 100);
        const amountArr = new Amount(currentID, amount);
        const token = new TimeStamp().UTC();
        const item = new CreateAccountsItem(keys, [amountArr], ETH);
        const fact = new CreateAccountsFact(token, senderAddr, [item]);
        return new OperationType(this._networkID, fact);
    }
    createMultiSig(senderAddr, receiverPubArr, currentID, amount, threshold) {
        const keys = this.pubToKeys(receiverPubArr, threshold);
        const amountArr = new Amount(currentID, amount);
        const token = new TimeStamp().UTC();
        const item = new CreateAccountsItem(keys, [amountArr], MITUM);
        const fact = new CreateAccountsFact(token, senderAddr, [item]);
        return new OperationType(this._networkID, fact);
    }
    createEtherMultiSig(senderAddr, receiverPubArr, currentID, amount, threshold) {
        const keys = this.ethPubToKeys(receiverPubArr, threshold);
        const amountArr = new Amount(currentID, amount);
        const token = new TimeStamp().UTC();
        const item = new CreateAccountsItem(keys, [amountArr], ETH);
        const fact = new CreateAccountsFact(token, senderAddr, [item]);
        return new OperationType(this._networkID, fact);
    }
    update(targetAddr, newPubArr, currentID) {
        const suffix = targetAddr.slice(-3);
        let key;
        if (suffix === "mca") {
            key = this.pubToKeys([{ key: newPubArr, weight: 100 }], 100);
        }
        else if (suffix === "eca") {
            key = this.ethPubToKeys([{ key: newPubArr, weight: 100 }], 100);
        }
        else {
            throw new Error("The target address is invalid-type");
        }
        const token = new TimeStamp().UTC();
        const fact = new KeyUpdaterFact(token, targetAddr, key, currentID);
        return new OperationType(this._networkID, fact);
    }
    updateMultiSig(targetAddr, newPubArr, currentID, threshold) {
        const suffix = targetAddr.slice(-3);
        let keys;
        if (suffix === "mca") {
            keys = this.pubToKeys(newPubArr, threshold);
        }
        else if (suffix === "eca") {
            keys = this.ethPubToKeys(newPubArr, threshold);
        }
        else {
            throw new Error("The target address is invalid-type");
        }
        const token = new TimeStamp().UTC();
        const fact = new KeyUpdaterFact(token, targetAddr, keys, currentID);
        return new OperationType(this._networkID, fact);
    }
    pubToKeys(pubKeys, threshold) {
        const pubs = pubKeys.map((pub) => new PubKey(pub.key, pub.weight));
        return new Keys(pubs, threshold);
    }
    ethPubToKeys(pubKeys, threshold) {
        const pubs = pubKeys.map((pub) => new PubKey(pub.key, pub.weight));
        return new EtherKeys(pubs, threshold);
    }
    async getAccountInfo(address) {
        return await accountInfo.getAddressInfo(this._node, address);
    }
    async getOperation(address) {
        return await accountInfo.getOperationsByAddress(this._node, address);
    }
    async getByPublickey(publickey) {
        return await accountInfo.getAccountInfoByPublickey(this._node, publickey);
    }
    async balance(address) {
        const info = await accountInfo.getAddressInfo(this._node, address);
        return info.data._embedded.balance;
    }
}
//# sourceMappingURL=index.js.map