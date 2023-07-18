import axios, { AxiosResponse } from "axios";

export default {
  async getServiceInfo(
    provider: string,
    contract: string,
    serviceId: string
  ): Promise<AxiosResponse | null> {
    if (provider === "" || contract === "" || serviceId === "") {
      console.error(
        "RPC-URL is not provided or You need to set 'contract address and service id'."
      );
      return null;
    }

    try {
      const res = await axios.get(
        `${provider}/timestamp/${contract}/service/${serviceId}`
      );
      return res;
    } catch (error: any) {
      console.error(error);
      return null;
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
      console.error(
        "RPC-URL is not provided or You need to set 'contract address and service id'."
      );
      return null;
    }

    try {
      const res = await axios.get(
        `${provider}/timestamp/${contract}/service/${serviceID}/project/${projectID}/id/${tID}`
      );
      return res;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },
};
