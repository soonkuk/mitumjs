import { AxiosResponse } from "axios";
import { OperationType } from "../../types/operation.js";
import { Fact } from "../../types/fact.js";
export declare class Timestamp {
    private _networkID;
    private _node;
    private _contractAddress;
    private _serviceID;
    constructor(networkID: string, provider?: string);
    private _setNode;
    private _setChain;
    setContractAddress(contractAddress: string): void;
    setServiceId(serviceId: string): void;
    getContractAddress(): string;
    getServiceId(): string;
    getServiceInfo(serviceID?: string): Promise<AxiosResponse>;
    getTimestampInfo(serviceID: string, projectID: string, tID: number): Promise<AxiosResponse>;
    append(sender: string, projectID: string, requestTime: number, data: string, currencyID: string): OperationType<Fact>;
    createTimestampService(sender: string, currencyID: string): OperationType<Fact>;
}
