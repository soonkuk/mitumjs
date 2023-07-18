import axios, { AxiosResponse } from "axios";

export default {
  async getServiceInfo(
    provider: string,
    contract: string,
    serviceId: string
  ): Promise<AxiosResponse | null> {
    if (provider === "" || contract === "" || serviceId === "") {
      console.error(
        "RPC-URL is not provided or You need to set 'contract address and credential id'."
      );
      return null;
    }

    try {
      const res = await axios.get(
        `${provider}/did/${contract}/issuer/${serviceId}`
      );
      return res;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },

  async getCredentialInfo(
    provider: string,
    contract: string,
    serviceId: string,
    templateId: string,
    credentialId: string
  ): Promise<AxiosResponse | null> {
    if (provider === "" || contract === "" || serviceId === "") {
      console.error(
        "RPC-URL is not provided or You need to set 'contract address and credential id'."
      );
      return null;
    }

    try {
      const res = await axios.get(
        `${provider}/did/${contract}/issuer/${serviceId}/template/${templateId}/credential/${credentialId}`
      );
      return res;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },

  async getTemplate(
    provider: string,
    contract: string,
    serviceId: string,
    templateId: string
  ): Promise<AxiosResponse | null> {
    if (provider === "" || contract === "" || serviceId === "") {
      console.error(
        "RPC-URL is not provided or You need to set 'contract address and credential id'."
      );
      return null;
    }

    try {
      const res = await axios.get(
        `${provider}/did/${contract}/issuer/${serviceId}/template/${templateId}`
      );
      return res;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },

  async getCredentialByHolder(
    provider: string,
    contract: string,
    serviceId: string,
    holder: string
  ): Promise<AxiosResponse | null> {
    if (provider === "" || contract === "" || serviceId === "") {
      console.error(
        "RPC-URL is not provided or You need to set 'contract address and credential id'."
      );
      return null;
    }

    try {
      const res = await axios.get(
        `${provider}/did/${contract}/issuer/${serviceId}/holder/${holder}`
      );
      return res;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },
};
