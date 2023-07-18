import { AxiosResponse } from "axios";
export declare class Block {
    private _node;
    constructor(provider?: string);
    private _setNode;
    getAllBlocks(): Promise<AxiosResponse | null>;
    getBlock(block: number | string): Promise<AxiosResponse | null>;
    getOperation(block: number): Promise<AxiosResponse | null>;
}
