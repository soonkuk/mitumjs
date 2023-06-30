import { AxiosResponse } from "axios";
declare const _default: {
    getNftInfo(provider: string, contract: string, collection: string, tokenID: number): Promise<AxiosResponse>;
    getCollectionInfo(provider: string, contract: string, collection: string): Promise<AxiosResponse>;
    getAllNftInfo(provider: string, contract: string, collection: string): Promise<AxiosResponse>;
    getOperationInfo(provider: string, contract: string, collection: string, address: string): Promise<AxiosResponse>;
};
export default _default;
