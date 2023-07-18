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
const axios_1 = __importDefault(require("axios"));
exports.default = {
    getNftInfo(provider, contract, collection, tokenID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (provider === "" || contract === undefined || collection === undefined) {
                console.error("RPC-URL is not provided or You need to set 'contract address and collection id'.");
                return null;
            }
            try {
                const res = yield axios_1.default.get(`${provider}/nft/${contract}/collection/${collection}/${tokenID}`);
                return res;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    },
    getCollectionInfo(provider, contract, collection) {
        return __awaiter(this, void 0, void 0, function* () {
            if (provider === "" || contract === undefined || collection === undefined) {
                console.error("RPC-URL is not provided or You need to set 'contract address and collection id'.");
                return null;
            }
            try {
                const res = yield axios_1.default.get(`${provider}/nft/${contract}/collection/${collection}`);
                return res;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    },
    getAllNftInfo(provider, contract, collection) {
        return __awaiter(this, void 0, void 0, function* () {
            if (provider === "" || contract === undefined || collection === undefined) {
                console.error("RPC-URL is not provided or You need to set 'contract address and collection id'.");
                return null;
            }
            try {
                const res = yield axios_1.default.get(`${provider}/nft/${contract}/collection/${collection}/nfts`);
                return res;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    },
    getOperationInfo(provider, contract, collection, address) {
        return __awaiter(this, void 0, void 0, function* () {
            if (provider === "" || contract === undefined || collection === undefined) {
                console.error("RPC-URL is not provided or You need to set 'contract address and collection id'.");
                return null;
            }
            try {
                const res = yield axios_1.default.get(`${provider}/nft/${contract}/collection/${collection}/account/${address}/operators`);
                return res;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    },
};
//# sourceMappingURL=information.js.map