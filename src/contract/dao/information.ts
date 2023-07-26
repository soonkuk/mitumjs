import axios, { AxiosResponse } from "axios";

export default {
  async getServiceInfo(
    provider: string,
    contract: string,
    serviceId: string
  ): Promise<AxiosResponse> {
    if (provider === "" || contract === "" || serviceId === "") {
      throw new Error(
        "RPC-URL is not provided or You need to set 'contract address and dao id'."
      );
    }

    try {
      const res = await axios.get(
        `${provider}/dao/${contract}/service/${serviceId}`
      );
      return res;
    } catch (error: any) {
      throw new Error(error.response.data);
    }
  },

  async getProposalInfo(
    provider: string,
    contract: string,
    serviceId: string,
    proposalId: string
  ): Promise<AxiosResponse> {
    if (provider === "" || contract === "" || serviceId === "") {
      throw new Error(
        "RPC-URL is not provided or You need to set 'contract address and dao id'."
      );
    }

    try {
      const res = await axios.get(
        `${provider}/dao/${contract}/service/${serviceId}/proposal/${proposalId}`
      );
      return res;
    } catch (error: any) {
      throw new Error(error.response.data);
    }
  },

  async getDelegatorInfo(
    provider: string,
    contract: string,
    serviceId: string,
    proposalId: string,
    delegator: string
  ): Promise<AxiosResponse> {
    if (provider === "" || contract === "" || serviceId === "") {
      throw new Error(
        "RPC-URL is not provided or You need to set 'contract address and dao id'."
      );
    }

    try {
      const res = await axios.get(
        `${provider}/dao/${contract}/service/${serviceId}/proposal/${proposalId}/delegator/${delegator}}`
      );
      return res;
    } catch (error: any) {
      throw new Error(error.response.data);
    }
  },

  async getVoterInfo(
    provider: string,
    contract: string,
    serviceId: string,
    proposalId: string,
    voter: string
  ): Promise<AxiosResponse> {
    if (provider === "" || contract === "" || serviceId === "") {
      throw new Error(
        "RPC-URL is not provided or You need to set 'contract address and dao id'."
      );
    }

    try {
      const res = await axios.get(
        `${provider}/dao/${contract}/service/${serviceId}/proposal/${proposalId}/voter/${voter}`
      );
      return res;
    } catch (error: any) {
      throw new Error(error.response.data);
    }
  },

  async getVotingResult(
    provider: string,
    contract: string,
    serviceId: string,
    proposalId: string
  ): Promise<AxiosResponse> {
    if (provider === "" || contract === "" || serviceId === "") {
      throw new Error(
        "RPC-URL is not provided or You need to set 'contract address and dao id'."
      );
    }

    try {
      const res = await axios.get(
        `${provider}/dao/${contract}/service/${serviceId}/proposal/${proposalId}/votingpower`
      );
      return res;
    } catch (error: any) {
      throw new Error(error.response.data);
    }
  },
};
