import { isIPAddress } from "../utils/validation";
import blockInfo from "./information";

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
  getAll(): any {
    return blockInfo.getAllBlocksInfo(this._node);
  }

  // get block information by block number or hash
  get(block: number | string): any {
    if (typeof block === "number") {
      return blockInfo.getBlockByHeight(this._node, block);
    }

    return blockInfo.getBlockByHash(this._node, block);
  }

  // get the operations contained in a specific block.
  getOperation(block: number): any {
    return blockInfo.getOperations(this._node, block);
  }
}
