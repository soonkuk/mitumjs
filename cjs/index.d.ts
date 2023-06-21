import { Account } from "./account/index.js";
import { Currency } from "./currency/index.js";
import { Block } from "./block/index.js";
import { Contract } from "./contract/index.js";
import { Operation } from "./operation/index.js";
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
