import { Account } from "./account";
import { Currency } from "./currency";
import { Block } from "./block";
import { Contract } from "./contract";
import { Operation } from "./operation";
import { AxiosResponse } from "axios";
export declare class Mitum {
    private _version;
    private _node;
    private _chain;
    account: Account;
    currency: Currency;
    block: Block;
    contract: Contract;
    operation: Operation;
    constructor(provider?: string);
    version(): string;
    node(): Promise<AxiosResponse<any, any>>;
    setNode(provider?: string): void;
    getNode(): string;
    chain(): string;
    setChain(url: string): void;
}
export default Mitum;
