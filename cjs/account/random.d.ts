import { KeyPair } from "./iPair.js";
import { Keys } from "./publicKey.js";
import { KeyPairType } from "../types/address.js";
export declare const M2RandomN: (n: number, keyType: KeyPairType) => {
    keys: Keys;
    keypairs: KeyPair[];
};
export declare const M2EtherRandomN: (n: number, keyType: KeyPairType) => {
    keys: Keys;
    keypairs: KeyPair[];
};
