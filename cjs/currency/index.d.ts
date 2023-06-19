import { OperationType } from "../types/operation";
import { Fact } from "../types/fact";
import { AxiosResponse } from "axios";
import { inputData } from "./design";
export declare class Currency {
    private _node;
    constructor(provider?: string);
    private _setNode;
    getAll(): Promise<AxiosResponse>;
    get(currencyID: string): Promise<AxiosResponse>;
    /** structure
     * inputData = {
     *    currencyID: string;
     *    genesisAddress: string;
     *    totalSupply: number;
     *    minBalance: number;
     *    feeType: feeType; // "none" or "fixed" or "ratio"
     *    feeReceiver?: string; // receiver address
     *    fee?: number; // case of "fixed" fee or ratio
     *    minFee?: number;
     *    maxFee?: number;
     * }
     */
    create(data: inputData): OperationType<Fact>;
    /** structure
     * inputData = {
     *    currencyID: string;
     *    minBalance: number;
     *    feeType: feeType; // "none" or "fixed" or "ratio"
     *    feeReceiver?: string; // receiver address
     *    fee?: number; // case of "fixed" fee or ratio
     *    minFee?: number;
     *    maxFee?: number;
     * }
     */
    setPolicy(data: inputData): OperationType<Fact>;
    private setFeePolicy;
    transfer(sender: string, receiver: string, currencyID: string, amount: number): OperationType<Fact>;
    mint(receiver: string, currencyID: string, amount: number): OperationType<Fact>;
}
