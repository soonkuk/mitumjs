import { AxiosResponse } from "axios";
export declare class Node {
    private _node;
    constructor(provider?: string);
    setNode(provider?: string): void;
    getNodeUri(): string;
    getNodeInfo(): Promise<AxiosResponse>;
}
