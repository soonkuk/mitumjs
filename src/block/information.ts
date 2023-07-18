import axios, { AxiosResponse } from "axios";

export default {
  async getAllBlocksInfo(provider: string): Promise<AxiosResponse | null> {
    if (provider === "") {
      console.error("RPC-URL is not provided.");
      return null;
    }

    try {
      const res = await axios.get(`${provider}/block/manifests`);
      return res;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },

  async getBlockByHeight(
    provider: string,
    height: number
  ): Promise<AxiosResponse | null> {
    if (provider === "") {
      console.error("RPC-URL is not provided.");
      return null;
    }

    try {
      const res = await axios.get(`${provider}/block/${height}/manifest`);
      return res;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },

  async getBlockByHash(
    provider: string,
    blockhash: string
  ): Promise<AxiosResponse | null> {
    if (provider === "") {
      console.error("RPC-URL is not provided.");
      return null;
    }

    try {
      const res = await axios.get(`${provider}/block/${blockhash}/manifest`);
      return res;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },

  async getOperations(
    provider: string,
    block: number
  ): Promise<AxiosResponse | null> {
    if (provider === "") {
      console.error("RPC-URL is not provided.");
      return null;
    }

    try {
      const res = await axios.get(`${provider}/block/${block}/operations`);
      return res;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },
};
