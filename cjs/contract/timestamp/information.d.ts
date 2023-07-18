import { AxiosResponse } from "axios";
declare const _default: {
    getServiceInfo(provider: string, contract: string, serviceId: string): Promise<AxiosResponse | null>;
    getTimestampInfo(provider: string, contract: string, serviceID: string, projectID: string, tID: number): Promise<AxiosResponse | null>;
};
export default _default;
