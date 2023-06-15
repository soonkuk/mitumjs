/// <reference types="node" />
import ethWallet from "ethereumjs-wallet";
export declare const isIPAddress: (item: unknown) => boolean;
export declare const verify: (addressType: string, signer: Uint8Array | ethWallet, sig: string | Buffer, msg: string | Buffer) => boolean;
