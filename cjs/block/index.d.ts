import { AxiosResponse } from "axios";
export declare class Block {
    private _node;
    constructor(provider?: string);
    private _setNode;
    getAllBlocks(): Promise<AxiosResponse>;
    getBlock(block: number | string): Promise<AxiosResponse>;
    getOperation(block: number): Promise<AxiosResponse>;
}
