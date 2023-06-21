"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const validation_1 = require("../utils/validation");
const information_1 = __importDefault(require("./information"));
class Block {
    constructor(provider) {
        this._node = "";
        this._setNode(provider);
    }
    _setNode(provider) {
        if ((0, validation_1.isIPAddress)(provider)) {
            this._node = provider;
        }
    }
    // get information of all-blocks
    // It's possible to obtain 10 pieces of information,
    // along with a link for retrieving consecutive blocks-information.
    getAll() {
        return information_1.default.getAllBlocksInfo(this._node);
    }
    // get block information by block number or hash
    get(block) {
        if (typeof block === "number") {
            return information_1.default.getBlockByHeight(this._node, block);
        }
        return information_1.default.getBlockByHash(this._node, block);
    }
    // get the operations contained in a specific block.
    getOperation(block) {
        return information_1.default.getOperations(this._node, block);
    }
}
exports.Block = Block;
//# sourceMappingURL=index.js.map