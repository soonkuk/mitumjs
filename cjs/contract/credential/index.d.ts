import { AxiosResponse } from "axios";
import { OperationType } from "../../types/operation.js";
import { Fact } from "../../types/fact.js";
import { templateData, issueData } from "./design.js";
export declare class Credential {
    private _networkID;
    private _node;
    private _address;
    private _serviceID;
    constructor(networkID: string, provider?: string);
    private _setNode;
    private _setChain;
    setContractAddress(contractAddress: string): void;
    setServiceId(serviceId: string): void;
    getContractAddress(): string;
    getCredentialId(): string;
    createCredential(sender: string, credentialId: string, currency: string): OperationType<Fact>;
    /** Description of templateData **
      templateData = {
          templateId: number,
          templateName: string,
          serviceDate: date,
          expirationDate: date,
          templateShare: boolean,
          multiAudit: boolean,
          displayName: string,
          subjectKey: string,
          description: string,
          creator: string,
      }
    */
    addTemplate(sender: string, data: templateData, currency: string): OperationType<Fact>;
    /** Description of issueData **
      issueData = {
          holder: string,
          templateId: number,
          id: string,
          value: string,
          validFrom: number,
          validUntil: number,
          did: string,
      }
    */
    issue(sender: string, data: issueData, currency: string): OperationType<Fact>;
    revoke(sender: string, holder: string, templateId: number, id: string, currency: string): OperationType<Fact>;
    getServiceInfo(serviceId?: string): Promise<AxiosResponse>;
    getCredentialInfo(serviceId: string, templateId: string, credentialId: string): Promise<AxiosResponse>;
    getTemplate(serviceId: string, templateId: string): Promise<AxiosResponse>;
    claimCredential(serviceID: string, holder: string): Promise<AxiosResponse>;
}
