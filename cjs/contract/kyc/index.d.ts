import { OperationType } from "../../types/operation.js";
import { Fact } from "../../types/fact.js";
export declare class Kyc {
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
    addController(sender: string, controller: string, currency: string): OperationType<Fact>;
    addCustomer(sender: string, customer: string, status: boolean, currency: string): OperationType<Fact>;
    createKYCService(sender: string, serviceID: string, controllers: string[], currency: string): OperationType<Fact>;
    removeController(sender: string, controller: string, currency: string): OperationType<Fact>;
    updateCustomer(sender: string, customer: string, status: boolean, currency: string): OperationType<Fact>;
    auxFunction(): string;
}
