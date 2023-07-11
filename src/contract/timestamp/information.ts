import axios, { AxiosResponse } from "axios";

export default {
  async getServiceInfo(
    provider: string,
    contract: string,
    serviceId: string
  ): Promise<AxiosResponse> {
    if (provider === "" || contract === "" || serviceId === "") {
      return Promise.reject(
        new Error(
          "RPC-URL is not provided or You need to set 'contract address and service id'."
        )
      );
    }

    try {
      const res = await axios.get(
        `${provider}/timestamp/${contract}/service/${serviceId}`
      );
      return res;
    } catch (error: any) {
      return Promise.reject(
        new Error(`Error getting node information: ${error.message}`)
      );
    }
  },

  async getTimestampInfo(
    provider: string,
    contract: string,
    serviceID: string,
    projectID: string,
    tID: number
  ): Promise<AxiosResponse> {
    if (
      provider === "" ||
      contract === "" ||
      serviceID === "" ||
      projectID === ""
    ) {
      return Promise.reject(
        new Error("RPC-URL is not provided or You need to set correct params")
      );
    }

    try {
      const res = await axios.get(
        `${provider}/timestamp/${contract}/service/${serviceID}/project/${projectID}/id/${tID}`
      );
      return res;
    } catch (error: any) {
      return Promise.reject(
        new Error(`Error getting node information: ${error.message}`)
      );
    }
  },
};
