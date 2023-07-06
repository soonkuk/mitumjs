import axios, { AxiosResponse } from "axios";

export default {
  async getCredentialInfo(
    provider: string,
    contract: string,
    credential: string,
    id: string
  ): Promise<AxiosResponse> {
    if (provider === "" || contract === "" || credential === "") {
      return Promise.reject(
        new Error(
          "RPC-URL is not provided or You need to set 'contract address and credential id'."
        )
      );
    }

    try {
      const res = await axios.get(
        `${provider}/credential/${contract}/collection/${credential}/${id}`
      );
      return res;
    } catch (error: any) {
      return Promise.reject(
        new Error(`Error getting node information: ${error.message}`)
      );
    }
  },
};
