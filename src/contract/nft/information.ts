import axios, { AxiosResponse } from "axios";

export default {
  async getNftInfo(
    provider: string,
    contract: string,
    collection: string,
    tokenID: number
  ): Promise<AxiosResponse> {
    if (provider === "" || contract === "") {
      return Promise.reject(
        new Error(
          "RPC-URL is not provided or You need to set 'contract address'."
        )
      );
    }

    try {
      const res = await axios.get(
        `${provider}/nft/${contract}/collection/${collection}/${tokenID}`
      );
      return res;
    } catch (error: any) {
      return Promise.reject(
        new Error(`Error getting node information: ${error.message}`)
      );
    }
  },
};
