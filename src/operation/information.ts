import axios, { AxiosResponse } from "axios";

export default {
  async getAllOperationsInfo(provider: string): Promise<AxiosResponse> {
    if (provider === "") {
      throw new Error("RPC-URL is not provided.");
    }

    try {
      const res = await axios.get(`${provider}/block/operations`);
      return res;
    } catch (error: any) {
      throw new Error(error.response.data);
    }
  },

  async getOperationInfo(
    provider: string,
    facthash: string
  ): Promise<AxiosResponse> {
    if (provider === "") {
      throw new Error("RPC-URL is not provided.");
    }

    try {
      const res = await axios.get(`${provider}/block/operation/${facthash}`);
      return res;
    } catch (error: any) {
      throw new Error(error.response.data);
    }
  },
};
