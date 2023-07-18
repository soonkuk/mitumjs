import axios, { AxiosResponse } from "axios";

export default {
  async getServiceInfo(
    provider: string,
    contract: string,
    serviceId: string
  ): Promise<AxiosResponse> {
    if (provider === "" || contract === "" || serviceId === "") {
      throw new Error(
        "RPC-URL is not provided or You need to set 'contract address and credential id'."
      );
    }

    try {
      const res = await axios.get(
        `${provider}/did/${contract}/issuer/${serviceId}`
      );
      return res;
    } catch (error: any) {
      throw new Error(error.response.data);
    }
  },

  async getCredentialInfo(
    provider: string,
    contract: string,
    serviceId: string,
    templateId: string,
    credentialId: string
  ): Promise<AxiosResponse> {
    if (provider === "" || contract === "" || serviceId === "") {
      throw new Error(
        "RPC-URL is not provided or You need to set 'contract address and credential id'."
      );
    }

    try {
      const res = await axios.get(
        `${provider}/did/${contract}/issuer/${serviceId}/template/${templateId}/credential/${credentialId}`
      );
      return res;
    } catch (error: any) {
      throw new Error(error.response.data);
    }
  },

  async getTemplate(
    provider: string,
    contract: string,
    serviceId: string,
    templateId: string
  ): Promise<AxiosResponse> {
    if (provider === "" || contract === "" || serviceId === "") {
      throw new Error(
        "RPC-URL is not provided or You need to set 'contract address and credential id'."
      );
    }

    try {
      const res = await axios.get(
        `${provider}/did/${contract}/issuer/${serviceId}/template/${templateId}`
      );
      return res;
    } catch (error: any) {
      throw new Error(error.response.data);
    }
  },

  async getCredentialByHolder(
    provider: string,
    contract: string,
    serviceId: string,
    holder: string
  ): Promise<AxiosResponse> {
    if (provider === "" || contract === "" || serviceId === "") {
      throw new Error(
        "RPC-URL is not provided or You need to set 'contract address and credential id'."
      );
    }

    try {
      const res = await axios.get(
        `${provider}/did/${contract}/issuer/${serviceId}/holder/${holder}`
      );
      return res;
    } catch (error: any) {
      throw new Error(error.response.data);
    }
  },
};
