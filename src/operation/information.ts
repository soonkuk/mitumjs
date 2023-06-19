import axios, { AxiosResponse } from "axios";

export default {
  async getAllOperationsInfo(provider: string): Promise<AxiosResponse> {
    if (provider === "") {
      return Promise.reject(new Error("RPC-URL is not provided."));
    }

    try {
      const res = await axios.get(`${provider}/block/operations`);
      return res;
    } catch (error: any) {
      return Promise.reject(
        new Error(`Error getting node information: ${error.message}`)
      );
    }
  },

  async getOperationInfo(
    provider: string,
    facthash: string
  ): Promise<AxiosResponse> {
    if (provider === "") {
      return Promise.reject(new Error("RPC-URL is not provided."));
    }

    try {
      const res = await axios.get(`${provider}/block/operation/${facthash}`);
      return res;
    } catch (error: any) {
      return Promise.reject(
        new Error(`Error getting node information: ${error.message}`)
      );
    }
  },
};
