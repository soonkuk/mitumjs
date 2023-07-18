import { AxiosResponse } from "axios";
declare const _default: {
    getNftInfo(provider: string, contract: string, collection: string, tokenID: number): Promise<AxiosResponse | null>;
    getCollectionInfo(provider: string, contract: string, collection: string): Promise<AxiosResponse | null>;
    getAllNftInfo(provider: string, contract: string, collection: string): Promise<AxiosResponse | null>;
    getOperationInfo(provider: string, contract: string, collection: string, address: string): Promise<AxiosResponse | null>;
};
export default _default;
