import { OperationType } from "../types/operation";
import { Fact } from "../types/fact";
import { AxiosResponse } from "axios";
export declare class Operation {
    private _node;
    constructor(provider?: string);
    private _setNode;
    getAll(): Promise<AxiosResponse>;
    get(facthash: string): Promise<AxiosResponse>;
    sign(privatekey: string, operation: OperationType<Fact>, option?: string): OperationType<Fact>;
    send(signedOperation: OperationType<Fact>, headers?: {
        [i: string]: any;
    }): Promise<AxiosResponse>;
}
