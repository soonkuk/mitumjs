import { AxiosResponse } from "axios";
declare const _default: {
    getServiceInfo(provider: string, contract: string, serviceId: string): Promise<AxiosResponse | null>;
    getCredentialInfo(provider: string, contract: string, serviceId: string, templateId: string, credentialId: string): Promise<AxiosResponse | null>;
    getTemplate(provider: string, contract: string, serviceId: string, templateId: string): Promise<AxiosResponse | null>;
    getCredentialByHolder(provider: string, contract: string, serviceId: string, holder: string): Promise<AxiosResponse | null>;
};
export default _default;
