/// <reference types="node" />
export declare const isIPAddress: (item: unknown) => boolean;
export declare const isAddress: (item: string) => boolean;
export declare const verify: (addressType: string, signer: Uint8Array, sig: string | Buffer, msg: string | Buffer) => boolean;
