import { AxiosResponse } from "axios";
export declare function sendOperation(signedOperation: any, provider: string, headers?: {
    [i: string]: any;
}): Promise<AxiosResponse>;
