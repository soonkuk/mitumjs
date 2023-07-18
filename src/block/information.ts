import axios, { AxiosResponse } from "axios";

export default {
  async getAllBlocksInfo(provider: string): Promise<AxiosResponse> {
    if (provider === "") {
      throw new Error("RPC-URL is not provided.");
    }

    try {
      const res = await axios.get(`${provider}/block/manifests`);
      return res;
    } catch (error: any) {
      throw new Error(error.response.data);
    }
  },

  async getBlockByHeight(
    provider: string,
    height: number
  ): Promise<AxiosResponse> {
    if (provider === "") {
      throw new Error("RPC-URL is not provided.");
    }

    try {
      const res = await axios.get(`${provider}/block/${height}/manifest`);
      return res;
    } catch (error: any) {
      throw new Error(error.response.data);
    }
  },

  async getBlockByHash(
    provider: string,
    blockhash: string
  ): Promise<AxiosResponse> {
    if (provider === "") {
      throw new Error("RPC-URL is not provided.");
    }

    try {
      const res = await axios.get(`${provider}/block/${blockhash}/manifest`);
      return res;
    } catch (error: any) {
      throw new Error(error.response.data);
    }
  },

  async getOperations(provider: string, block: number): Promise<AxiosResponse> {
    if (provider === "") {
      throw new Error("RPC-URL is not provided.");
    }

    try {
      const res = await axios.get(`${provider}/block/${block}/operations`);
      return res;
    } catch (error: any) {
      throw new Error(error.response.data);
    }
  },
};
