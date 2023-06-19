import { OperationType } from "../types/operation";
import { Fact } from "../types/fact";
import { AxiosResponse } from "axios";
export declare function sendOperation(signedOperation: OperationType<Fact>, provider: string, headers?: {
    [i: string]: any;
}): Promise<AxiosResponse>;
