import { WalletType } from "../types/wallet.js";
import { OperationType } from "../types/operation.js";
import { Fact } from "../types/fact.js";
import { AxiosResponse } from "axios";
export declare class Contract {
    private _networkID;
    private _node;
    constructor(networkID: string, provider?: string);
    private _setNode;
    private _setChain;
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
    private pubToKeys;
    private ethPubToKeys;
    getContractInfo(address: string): Promise<AxiosResponse | null>;
}
