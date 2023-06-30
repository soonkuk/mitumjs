import { OperationType } from "../types/operation.js";
import { Fact } from "../types/fact.js";
import { Key, Keys } from "./publicKey.js";
import { WalletType } from "../types/wallet.js";
import { KeyPair } from "./iPair.js";
import { M2KeyPair } from "./key.js";
import { AxiosResponse } from "axios";
export declare class Account {
    private _networkID;
    private _node;
    constructor(networkID: string, provider?: string);
    private _setNode;
    private _setChain;
    key(seed?: string): M2KeyPair;
    keys(n: number): {
        keys: Keys;
        keypairs: KeyPair[];
    };
    fromPrivateKey(key: string | Key): M2KeyPair;
    etherKey(seed?: string): M2KeyPair;
    etherKeys(n: number): {
        keys: Keys;
        keypairs: KeyPair[];
    };
    address(pubKey: string): string;
    etherAddress(pubKey: string): string;
    addressForMultiSig(pubKeys: Array<{
        key: string;
        weight: number;
    }>, threshold: number): string;
    etherAddressForMultiSig(pubKeys: Array<{
        weight: number;
        key: string;
    }>, threshold: number): string;
    createWallet(sender: string, currencyID: string, amount: number, seed?: string, weight?: number): {
        wallet: WalletType;
        operation: OperationType<Fact>;
    };
    touch(privatekey: string, wallet: {
        wallet: WalletType;
        operation: OperationType<Fact>;
    }): Promise<AxiosResponse>;
    create(senderAddr: string, receiverPub: string, currentID: string, amount: number): OperationType<Fact>;
    createEtherAccount(senderAddr: string, receiverPub: string, currentID: string, amount: number): OperationType<Fact>;
    createMultiSig(senderAddr: string, receiverPubArr: Array<{
        weight: number;
        key: string;
    }>, currentID: string, amount: number, threshold: number): OperationType<Fact>;
    createEtherMultiSig(senderAddr: string, receiverPubArr: Array<{
        weight: number;
        key: string;
    }>, currentID: string, amount: number, threshold: number): OperationType<Fact>;
    update(targetAddr: string, newPubArr: string, currentID: string): OperationType<Fact>;
    updateMultiSig(targetAddr: string, newPubArr: Array<{
        weight: number;
        key: string;
    }>, currentID: string, threshold: number): OperationType<Fact>;
    private pubToKeys;
    getAccount(address: string): Promise<AxiosResponse>;
    getOperation(address: string): Promise<AxiosResponse>;
    getByPublickey(publickey: string): Promise<AxiosResponse>;
}
