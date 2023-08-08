import { AxiosResponse } from "axios";
declare const _default: {
    getServiceInfo(provider: string, contract: string, serviceId: string): Promise<AxiosResponse>;
    getCredentialInfo(provider: string, contract: string, serviceId: string, templateId: string, credentialId: string): Promise<AxiosResponse>;
    getTemplate(provider: string, contract: string, serviceId: string, templateId: string): Promise<AxiosResponse>;
    getAllCredentials(provider: string, contract: string, serviceId: string, templateId: string): Promise<AxiosResponse>;
    getCredentialByHolder(provider: string, contract: string, serviceId: string, holder: string): Promise<AxiosResponse>;
};
export default _default;
