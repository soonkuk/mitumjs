import axios, { AxiosResponse } from "axios";

export default {
  async getAddressInfo(
    provider: string,
    address: string
  ): Promise<AxiosResponse> {
    if (provider === "") {
      throw new Error("RPC-URL is not provided.");
    }

    try {
      const res = await axios.get(`${provider}/account/${address}`);
      return res;
    } catch (error: any) {
      throw new Error(error.response.data);
    }
  },

  async getOperationsByAddress(
    provider: string,
    address: string
  ): Promise<AxiosResponse> {
    if (provider === "") {
      throw new Error("RPC-URL is not provided.");
    }

    try {
      const res = await axios.get(`${provider}/account/${address}/operations`);
      return res;
    } catch (error: any) {
      throw new Error(error.response.data);
    }
  },

  async getAccountInfoByPublickey(
    provider: string,
    publickey: string
  ): Promise<AxiosResponse> {
    if (provider === "") {
      throw new Error("RPC-URL is not provided.");
    }

    try {
      const res = await axios.get(
        `${provider}/accounts?publickey=${publickey}`
      );
      return res;
    } catch (error: any) {
      throw new Error(error.response.data);
    }
  },
};
