import axios, { AxiosResponse } from "axios";

export async function sendOperation(
  signedOperation: any,
  provider: string,
  headers?: { [i: string]: any }
): Promise<AxiosResponse | null> {
  if (provider === "") {
    return Promise.reject(new Error("RPC-URL is not provided."));
  }

  try {
    if (headers) {
      return await axios.post(`${provider}/builder/send`, signedOperation, {
        headers,
      });
    }
    return await axios.post(`${provider}/builder/send`, signedOperation);
  } catch (error: any) {
    return Promise.reject(
      new Error(`Error getting node information: ${error.response.data}`)
    );
  }
}
