import { Account } from "./account/index.js";
import { Currency } from "./currency/index.js";
import { Block } from "./block/index.js";
import { Operation } from "./operation/index.js";
import { AxiosResponse } from "axios";
import { Nft } from "./contract/nft/index.js";
export declare class Mitum {
    private _version;
    private _node;
    private _chain;
    account: Account;
    currency: Currency;
    block: Block;
    operation: Operation;
    nft: Nft;
    constructor(provider?: string);
    version(): string;
    node(): Promise<AxiosResponse>;
    setNode(provider?: string): void;
    getNode(): string;
    chain(): string;
    setChain(networkID: string): void;
}
export default Mitum;
