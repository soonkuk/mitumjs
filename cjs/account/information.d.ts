import { AxiosResponse } from "axios";
declare const _default: {
    getAddressInfo(provider: string, address: string): Promise<AxiosResponse | null>;
    getOperationsByAddress(provider: string, address: string): Promise<AxiosResponse | null>;
    getAccountInfoByPublickey(provider: string, publickey: string): Promise<AxiosResponse | null>;
};
export default _default;
