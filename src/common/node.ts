import axios, { AxiosResponse } from "axios";
import { isIPAddress } from "../utils/validation";

export class Node {
  private _node: string = "";

  constructor(provider?: string) {
    this.setNode(provider);
  }

  setNode(provider?: string) {
    if (isIPAddress(provider)) {
      this._node = provider as string;
      console.log("NOTE: mitum.js is running with RPC-URL: ", provider);
    } else {
      console.warn(
        "NOTE: Failed to configure the RPC-URL. Please verify and register the RPC-URL"
      );
    }
  }

  getNodeUri(): string {
    return this._node;
  }

  async getNodeInfo(): Promise<AxiosResponse> {
    if (this._node === "") {
      return Promise.reject(new Error("RPC-URL is not provided."));
    }

    try {
      const res = await axios.get(`${this._node}/`);
      return res;
    } catch (error: any) {
      return Promise.reject(
        new Error(`Error getting node information: ${error.message}`)
      );
    }
  }
}
