import { OperationType } from "../types/operation.js";
import { Fact } from "../types/fact.js";
import { Key, Keys } from "./publicKey.js";
import { KeyPair } from "./iPair.js";
import { M2KeyPair } from "./key.js";
import { AxiosResponse } from "axios";
export declare class Account {
    private _node;
    constructor(provider?: string);
    private _setNode;
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
    create(senderAddr: string, recieverPub: string, currentID: string, amount: number): OperationType<Fact>;
    createEtherAccount(senderAddr: string, recieverPub: string, currentID: string, amount: number): OperationType<Fact>;
    createMultiSig(senderAddr: string, recieverPubArr: Array<{
        weight: number;
        key: string;
    }>, currentID: string, amount: number, threshold: number): OperationType<Fact>;
    createEtherMultiSig(senderAddr: string, recieverPubArr: Array<{
        weight: number;
        key: string;
    }>, currentID: string, amount: number, threshold: number): OperationType<Fact>;
    updateKey(targetAddr: string, newPubArr: Array<{
        weight: number;
        key: string;
    }>, currentID: string, threshold: number): OperationType<Fact>;
    private pubToKeys;
    get(address: string): Promise<AxiosResponse>;
    getOperation(address: string): Promise<AxiosResponse>;
    getByPublickey(publickey: string): Promise<AxiosResponse>;
}
