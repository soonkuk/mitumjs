import { KeyPair } from "./iPair";
import { Keys } from "./publicKey";
import { KeyPairType } from "../types/address";
export declare const M2RandomN: (n: number, keyType: KeyPairType) => {
    keys: Keys;
    keypairs: KeyPair[];
};
export declare const M2EtherRandomN: (n: number, keyType: KeyPairType) => {
    keys: Keys;
    keypairs: KeyPair[];
};
