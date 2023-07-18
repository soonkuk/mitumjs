import axios, { AxiosResponse } from "axios";

export default {
  async getNftInfo(
    provider: string,
    contract: string,
    collection: string,
    tokenID: number
  ): Promise<AxiosResponse | null> {
    if (provider === "" || contract === undefined || collection === undefined) {
      console.error(
        "RPC-URL is not provided or You need to set 'contract address and collection id'."
      );
      return null;
    }

    try {
      const res = await axios.get(
        `${provider}/nft/${contract}/collection/${collection}/${tokenID}`
      );
      return res;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },

  async getCollectionInfo(
    provider: string,
    contract: string,
    collection: string
  ): Promise<AxiosResponse | null> {
    if (provider === "" || contract === undefined || collection === undefined) {
      console.error(
        "RPC-URL is not provided or You need to set 'contract address and collection id'."
      );
      return null;
    }

    try {
      const res = await axios.get(
        `${provider}/nft/${contract}/collection/${collection}`
      );
      return res;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },

  async getAllNftInfo(
    provider: string,
    contract: string,
    collection: string
  ): Promise<AxiosResponse | null> {
    if (provider === "" || contract === undefined || collection === undefined) {
      console.error(
        "RPC-URL is not provided or You need to set 'contract address and collection id'."
      );
      return null;
    }

    try {
      const res = await axios.get(
        `${provider}/nft/${contract}/collection/${collection}/nfts`
      );
      return res;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },

  async getOperationInfo(
    provider: string,
    contract: string,
    collection: string,
    address: string
  ): Promise<AxiosResponse | null> {
    if (provider === "" || contract === undefined || collection === undefined) {
      console.error(
        "RPC-URL is not provided or You need to set 'contract address and collection id'."
      );
      return null;
    }

    try {
      const res = await axios.get(
        `${provider}/nft/${contract}/collection/${collection}/account/${address}/operators`
      );
      return res;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },
};
