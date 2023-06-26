import { isIPAddress } from "../utils/validation.js";
import blockInfo from "./information.js";
export class Block {
    constructor(provider) {
        this._node = "";
        this._setNode(provider);
    }
    _setNode(provider) {
        if (isIPAddress(provider)) {
            this._node = provider;
        }
    }
    // get information of all-blocks
    // It's possible to obtain 10 pieces of information,
    // along with a link for retrieving consecutive blocks-information.
    async getAllBlocks() {
        return await blockInfo.getAllBlocksInfo(this._node);
    }
    // get block information by block number or hash
    async getBlock(block) {
        if (typeof block === "number") {
            return await blockInfo.getBlockByHeight(this._node, block);
        }
        return await blockInfo.getBlockByHash(this._node, block);
    }
    // get the operations contained in a specific block.
    async getOperation(block) {
        return await blockInfo.getOperations(this._node, block);
    }
}
//# sourceMappingURL=index.js.map