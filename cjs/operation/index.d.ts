import { OperationType } from "../types/operation.js";
import { Fact } from "../types/fact.js";
import { AxiosResponse } from "axios";
export declare class Operation {
    private _node;
    constructor(provider?: string);
    private _setNode;
    getAllOperations(): Promise<AxiosResponse>;
    getOperation(facthash: string): Promise<AxiosResponse>;
    sign(privatekey: string, operation: OperationType<Fact>, option?: string): any;
    send(signedOperation: any, headers?: {
        [i: string]: any;
    }): Promise<AxiosResponse>;
}
