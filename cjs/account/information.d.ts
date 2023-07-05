import { AxiosResponse } from "axios";
declare const _default: {
    getAddressInfo(provider: string, address: string): Promise<AxiosResponse>;
    getOperationsByAddress(provider: string, address: string): Promise<AxiosResponse>;
    getAccountInfoByPublickey(provider: string, publickey: string): Promise<AxiosResponse>;
};
export default _default;
