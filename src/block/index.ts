import { AxiosResponse } from "axios";
import { isIPAddress } from "../utils/validation.js";
import blockInfo from "./information.js";

export class Block {
  private _node: string = "";

  constructor(provider?: string) {
    this._setNode(provider);
  }

  private _setNode(provider?: string) {
    if (isIPAddress(provider)) {
      this._node = provider as string;
    }
  }

  // get information of all-blocks
  // It's possible to obtain 10 pieces of information,
  // along with a link for retrieving consecutive blocks-information.
  async getAllBlocks(): Promise<AxiosResponse> {
    return await blockInfo.getAllBlocksInfo(this._node);
  }

  // get block information by block number or hash
  async getBlock(block: number | string): Promise<AxiosResponse> {
    if (typeof block === "number") {
      return await blockInfo.getBlockByHeight(this._node, block);
    }

    return await blockInfo.getBlockByHash(this._node, block);
  }

  // get the operations contained in a specific block.
  async getOperation(block: number): Promise<AxiosResponse> {
    return await blockInfo.getOperations(this._node, block);
  }
}
