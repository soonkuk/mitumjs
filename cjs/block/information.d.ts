import { AxiosResponse } from "axios";
declare const _default: {
    getAllBlocksInfo(provider: string): Promise<AxiosResponse>;
    getBlockByHeight(provider: string, height: number): Promise<AxiosResponse>;
    getBlockByHash(provider: string, blockhash: string): Promise<AxiosResponse>;
    getOperations(provider: string, block: number): Promise<AxiosResponse>;
};
export default _default;
