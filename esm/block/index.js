import { isIPAddress } from "../utils/validation";
import blockInfo from "./information";
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
    getAll() {
        return blockInfo.getAllBlockInfo(this._node);
    }
    // get block information by block number or hash
    get(block) {
        if (typeof block === "number") {
            return blockInfo.getBlockByHeight(this._node, block);
        }
        return blockInfo.getBlockByHash(this._node, block);
    }
    // get the operations contained in a specific block.
    getOperations(block) {
        return blockInfo.getOperations(this._node, block);
    }
}
//# sourceMappingURL=index.js.map