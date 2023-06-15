import { Key, Keys } from "./publicKey";
import { KeyPair } from "./iPair";
import { M2KeyPair } from "./key";
import { Operation } from "../types/operation";
import { Fact } from "../types/fact";
export declare class Account {
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
    create(senderAddr: string, recieverPub: string, currentID: string, amount: number): Operation<Fact>;
    createEtherAccount(senderAddr: string, recieverPub: string, currentID: string, amount: number): Operation<Fact>;
    createMultiSig(senderAddr: string, recieverPubArr: Array<{
        weight: number;
        key: string;
    }>, currentID: string, amount: number, threshold: number): Operation<Fact>;
    createEtherMultiSig(senderAddr: string, recieverPubArr: Array<{
        weight: number;
        key: string;
    }>, currentID: string, amount: number, threshold: number): Operation<Fact>;
    updateKey(targetAddr: string, newPubArr: Array<{
        weight: number;
        key: string;
    }>, currentID: string, threshold: number): Operation<Fact>;
    private pubToKeys;
}
