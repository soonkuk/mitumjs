import axios, { AxiosResponse } from "axios";

export default {
  async getServiceInfo(
    provider: string,
    contract: string,
    serviceId: string
  ): Promise<AxiosResponse | null> {
    if (provider === "" || contract === "" || serviceId === "") {
      throw new Error(
        "RPC-URL is not provided or You need to set 'contract address and service id'."
      );
    }

    try {
      const res = await axios.get(
        `${provider}/timestamp/${contract}/service/${serviceId}`
      );
      return res;
    } catch (error: any) {
      throw new Error(error.response.data);
    }
  },

  async getTimestampInfo(
    provider: string,
    contract: string,
    serviceID: string,
    projectID: string,
    tID: number
  ): Promise<AxiosResponse | null> {
    if (
      provider === "" ||
      contract === "" ||
      serviceID === "" ||
      projectID === ""
    ) {
      throw new Error(
        "RPC-URL is not provided or You need to set 'contract address and service id'."
      );
    }

    try {
      const res = await axios.get(
        `${provider}/timestamp/${contract}/service/${serviceID}/project/${projectID}/id/${tID}`
      );
      return res;
    } catch (error: any) {
      throw new Error(error.response.data);
    }
  },
};
