import { AxiosResponse } from "axios";
declare const _default: {
    getAllBlocksInfo(provider: string): Promise<AxiosResponse | null>;
    getBlockByHeight(provider: string, height: number): Promise<AxiosResponse | null>;
    getBlockByHash(provider: string, blockhash: string): Promise<AxiosResponse | null>;
    getOperations(provider: string, block: number): Promise<AxiosResponse | null>;
};
export default _default;
