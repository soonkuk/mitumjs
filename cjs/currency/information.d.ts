import { AxiosResponse } from "axios";
declare const _default: {
    getAllCurrencyInfo(provider: string): Promise<AxiosResponse>;
    getCurrencyInfo(provider: string, currencyID: string): Promise<AxiosResponse>;
};
export default _default;
