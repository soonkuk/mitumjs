import { OperationType } from "../../types/operation.js";
import { Fact } from "../../types/fact.js";
import { stData } from "./design.js";
export declare class St {
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
    authorizeOperator(sender: string, operator: string, partition: string, currencyID: string): OperationType<Fact>;
    /** structure
     * stData = {
     *    serviceId: string;
     *    granularity: number;
     *    defaultPartition: string;
     *    controllers: string[];
     * }
     */
    createSTService(sender: string, data: stData, currency: string): OperationType<Fact>;
    issue(sender: string, receiver: string, partition: string, amount: number, currency: string): OperationType<Fact>;
    redeem(sender: string, tokenHolder: string, partition: string, amount: number, currency: string): OperationType<Fact>;
    revokeOperator(sender: string, operator: string, partition: string, currencyID: string): OperationType<Fact>;
    setDocument(sender: string, title: string, uri: string, documentHash: string, currencyID: string): OperationType<Fact>;
    transferByPartition(sender: string, holder: string, receiver: string, partition: string, amount: number, currencyID: string): OperationType<Fact>;
}
