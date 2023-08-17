import { isIPAddress } from "../utils/validation.js";
import { OperationType } from "../types/operation.js";
import { Keys, PubKey } from "../account/publicKey.js";
import { TimeStamp } from "../utils/time.js";
import { M2KeyPair } from "../account/key.js";
import { Operation } from "../operation/index.js";
import { Amount } from "../types/property.js";
import accountInfo from "../account/information.js";
import { CreateContractAccountsItem, CreateContractAccountsFact, } from "./account.js";
// const BTC: KeyPairType = "btc";
const MITUM = "mitum";
const ETH = "ether";
const MCA = "mca";
const ECA = "eca";
export class Contract {
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
        const address = this.pubToKeys([{ key: publickey, weight: wt }], wt, MCA).address.toString();
        const keys = this.pubToKeys([{ key: publickey, weight: wt }], wt, MCA);
        const amountArr = new Amount(currencyID, amount);
        const token = new TimeStamp().UTC();
        const item = new CreateContractAccountsItem(keys, [amountArr], MITUM);
        const fact = new CreateContractAccountsFact(token, sender, [item]);
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
        const keys = this.pubToKeys([{ key: receiverPub, weight: 100 }], 100, MCA);
        const amountArr = new Amount(currentID, amount);
        const token = new TimeStamp().UTC();
        const item = new CreateContractAccountsItem(keys, [amountArr], MITUM);
        const fact = new CreateContractAccountsFact(token, senderAddr, [item]);
        return new OperationType(this._networkID, fact);
    }
    createEtherAccount(senderAddr, receiverPub, currentID, amount) {
        const keys = this.pubToKeys([{ key: receiverPub, weight: 100 }], 100, ECA);
        const amountArr = new Amount(currentID, amount);
        const token = new TimeStamp().UTC();
        const item = new CreateContractAccountsItem(keys, [amountArr], ETH);
        const fact = new CreateContractAccountsFact(token, senderAddr, [item]);
        return new OperationType(this._networkID, fact);
    }
    createMultiSig(senderAddr, receiverPubArr, currentID, amount, threshold) {
        const keys = this.pubToKeys(receiverPubArr, threshold, MCA);
        const amountArr = new Amount(currentID, amount);
        const token = new TimeStamp().UTC();
        const item = new CreateContractAccountsItem(keys, [amountArr], MITUM);
        const fact = new CreateContractAccountsFact(token, senderAddr, [item]);
        return new OperationType(this._networkID, fact);
    }
    createEtherMultiSig(senderAddr, receiverPubArr, currentID, amount, threshold) {
        const keys = this.pubToKeys(receiverPubArr, threshold, ECA);
        const amountArr = new Amount(currentID, amount);
        const token = new TimeStamp().UTC();
        const item = new CreateContractAccountsItem(keys, [amountArr], ETH);
        const fact = new CreateContractAccountsFact(token, senderAddr, [item]);
        return new OperationType(this._networkID, fact);
    }
    pubToKeys(pubKeys, threshold, addressType) {
        const pubs = pubKeys.map((pub) => new PubKey(pub.key, pub.weight));
        return new Keys(pubs, threshold, addressType);
    }
    async getContractInfo(address) {
        return await accountInfo.getAddressInfo(this._node, address);
    }
}
//# sourceMappingURL=index.js.map