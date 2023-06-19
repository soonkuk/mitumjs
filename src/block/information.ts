import axios, { AxiosResponse } from "axios";

export default {
  async getAllBlockInfo(provider: string): Promise<AxiosResponse> {
    if (provider === "") {
      return Promise.reject(new Error("RPC-URL is not provided."));
    }

    try {
      const res = await axios.get(`${provider}/block/manifests`);
      return res;
    } catch (error: any) {
      return Promise.reject(
        new Error(`Error getting node information: ${error.message}`)
      );
    }
  },

  async getBlockByHeight(
    provider: string,
    height: number
  ): Promise<AxiosResponse> {
    if (provider === "") {
      return Promise.reject(new Error("RPC-URL is not provided."));
    }

    try {
      const res = await axios.get(`${provider}/block/${height}/manifest`);
      return res;
    } catch (error: any) {
      return Promise.reject(
        new Error(`Error getting node information: ${error.message}`)
      );
    }
  },

  async getBlockByHash(
    provider: string,
    blockhash: string
  ): Promise<AxiosResponse> {
    if (provider === "") {
      return Promise.reject(new Error("RPC-URL is not provided."));
    }

    try {
      const res = await axios.get(`${provider}/block/${blockhash}/manifest`);
      return res;
    } catch (error: any) {
      return Promise.reject(
        new Error(`Error getting node information: ${error.message}`)
      );
    }
  },

  async getOperations(provider: string, block: number): Promise<AxiosResponse> {
    if (provider === "") {
      return Promise.reject(new Error("RPC-URL is not provided."));
    }

    try {
      const res = await axios.get(`${provider}/block/${block}/operations`);
      return res;
    } catch (error: any) {
      return Promise.reject(
        new Error(`Error getting node information: ${error.message}`)
      );
    }
  },
};
