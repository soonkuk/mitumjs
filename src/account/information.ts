import axios, { AxiosResponse } from "axios";

export default {
  async getAddressInfo(
    provider: string,
    address: string
  ): Promise<AxiosResponse | null> {
    if (provider === "") {
      console.error("RPC-URL is not provided.");
      return null;
    }

    try {
      const res = await axios.get(`${provider}/account/${address}`);
      return res;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },

  async getOperationsByAddress(
    provider: string,
    address: string
  ): Promise<AxiosResponse | null> {
    if (provider === "") {
      console.error("RPC-URL is not provided.");
      return null;
    }

    try {
      const res = await axios.get(`${provider}/account/${address}/operations`);
      return res;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },

  async getAccountInfoByPublickey(
    provider: string,
    publickey: string
  ): Promise<AxiosResponse | null> {
    if (provider === "") {
      console.error("RPC-URL is not provided.");
      return null;
    }

    try {
      const res = await axios.get(
        `${provider}/accounts?publickey=${publickey}`
      );
      return res;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },
};
