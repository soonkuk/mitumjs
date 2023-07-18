import { OperationType } from "../types/operation.js";
import { Fact } from "../types/fact.js";
import { Key } from "./publicKey.js";
import { WalletType } from "../types/wallet.js";
import { AxiosResponse } from "axios";
export declare class Account {
    private _networkID;
    private _node;
    constructor(networkID: string, provider?: string);
    private _setNode;
    private _setChain;
    key(seed?: string): WalletType;
    keys(n: number): Array<WalletType>;
    fromPrivateKey(key: string | Key): WalletType;
    etherKey(seed?: string): WalletType;
    etherKeys(n: number): Array<WalletType>;
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
    }): Promise<AxiosResponse | null>;
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
    getAccountInfo(address: string): Promise<AxiosResponse | null>;
    getOperation(address: string): Promise<AxiosResponse | null>;
    getByPublickey(publickey: string): Promise<AxiosResponse | null>;
    balance(address: string): Promise<AxiosResponse | null>;
}
