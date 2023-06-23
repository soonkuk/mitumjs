import axios, { AxiosResponse } from "axios";

export default {
  async getAllCurrencyInfo(provider: string): Promise<AxiosResponse> {
    if (provider === "") {
      return Promise.reject(new Error("RPC-URL is not provided."));
    }

    try {
      const res = await axios.get(`${provider}/currency`);
      return res;
    } catch (error: any) {
      return Promise.reject(
        new Error(`Error getting node information: ${error.message}`)
      );
    }
  },

  async getCurrencyInfo(
    provider: string,
    currencyID: string
  ): Promise<AxiosResponse> {
    if (provider === "") {
      return Promise.reject(new Error("RPC-URL is not provided."));
    }

    try {
      const res = await axios.get(`${provider}/currency/${currencyID}`);
      return res;
    } catch (error: any) {
      return Promise.reject(
        new Error(`Error getting node information: ${error.message}`)
      );
    }
  },
};
