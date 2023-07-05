import { AxiosResponse } from "axios";
declare const _default: {
    getAllOperationsInfo(provider: string): Promise<AxiosResponse>;
    getOperationInfo(provider: string, facthash: string): Promise<AxiosResponse>;
};
export default _default;
