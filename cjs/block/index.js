"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const validation_js_1 = require("../utils/validation.js");
const information_js_1 = __importDefault(require("./information.js"));
class Block {
    constructor(provider) {
        this._node = "";
        this._setNode(provider);
    }
    _setNode(provider) {
        if ((0, validation_js_1.isIPAddress)(provider)) {
            this._node = provider;
        }
    }
    // get information of all-blocks
    // It's possible to obtain 10 pieces of information,
    // along with a link for retrieving consecutive blocks-information.
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield information_js_1.default.getAllBlocksInfo(this._node);
        });
    }
    // get block information by block number or hash
    get(block) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof block === "number") {
                return yield information_js_1.default.getBlockByHeight(this._node, block);
            }
            return yield information_js_1.default.getBlockByHash(this._node, block);
        });
    }
    // get the operations contained in a specific block.
    getOperation(block) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield information_js_1.default.getOperations(this._node, block);
        });
    }
}
exports.Block = Block;
//# sourceMappingURL=index.js.map