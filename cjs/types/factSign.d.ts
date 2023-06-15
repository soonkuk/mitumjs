/// <reference types="node" />
import { FullTimeStamp } from "../utils/time";
import { Address, NodeAddress } from "../account/address";
import { FS, M2FS, NodeFS } from "./iFact";
import { Key } from "../account/publicKey";
import { IBuffer } from "./interface";
export declare abstract class FactSign implements IBuffer {
    readonly signer: Key;
    readonly signature: Buffer;
    readonly signedAt: FullTimeStamp;
    constructor(signer: string | Key, signature: Buffer, signedAt: string);
    toBuffer(): Buffer;
    toHintedObject(): FS;
}
export declare class M2FactSign extends FactSign {
    constructor(signer: string | Key, signature: Buffer, signedAt: string);
    toHintedObject(): M2FS;
}
export declare class M2NodeFactSign extends FactSign {
    readonly node: Address;
    constructor(node: string | NodeAddress, signer: string | Key, signature: Buffer, signedAt: string);
    toBuffer(): Buffer;
    toHintedObject(): NodeFS;
}
