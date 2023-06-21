import axios, { AxiosResponse } from "axios";

export default {
  async getAddressInfo(
    provider: string,
    address: string
  ): Promise<AxiosResponse> {
    if (provider === "") {
      return Promise.reject(new Error("RPC-URL is not provided."));
    }

    try {
      const res = await axios.get(`${provider}/account/${address}`);
      return res;
    } catch (error: any) {
      return Promise.reject(
        new Error(`Error getting node information: ${error.message}`)
      );
    }
  },

  async getOperationsByAddress(
    provider: string,
    address: string
  ): Promise<AxiosResponse> {
    if (provider === "") {
      return Promise.reject(new Error("RPC-URL is not provided."));
    }

    try {
      const res = await axios.get(`${provider}/account/${address}/operations`);
      return res;
    } catch (error: any) {
      return Promise.reject(
        new Error(`Error getting node information: ${error.message}`)
      );
    }
  },

  async getAccountInfoByPublickey(
    provider: string,
    publickey: string
  ): Promise<AxiosResponse> {
    if (provider === "") {
      return Promise.reject(new Error("RPC-URL is not provided."));
    }

    try {
      const res = await axios.get(
        `${provider}/accounts?publickey=${publickey}`
      );
      return res;
    } catch (error: any) {
      return Promise.reject(
        new Error(`Error getting node information: ${error.message}`)
      );
    }
  },
};
