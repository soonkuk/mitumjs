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
exports.Nft = void 0;
const validation_js_1 = require("../../utils/validation.js");
const operation_js_1 = require("../../types/operation.js");
const time_js_1 = require("../../utils/time.js");
const register_js_1 = require("./register.js");
const delegate_js_1 = require("./delegate.js");
const updatePolicy_js_1 = require("./updatePolicy.js");
const approve_js_1 = require("./approve.js");
const mint_js_1 = require("./mint.js");
const sign_js_1 = require("./sign.js");
const information_js_1 = __importDefault(require("./information.js"));
class Nft {
    constructor(networkID, provider) {
        this._networkID = "";
        this._node = "";
        this._contractAddress = "";
        this._collection = "";
        this._setNode(provider);
        this._setChain(networkID);
    }
    _setNode(provider) {
        if ((0, validation_js_1.isIPAddress)(provider)) {
            this._node = provider;
        }
    }
    _setChain(networkID) {
        this._networkID = networkID;
    }
    setContractAddress(contractAddress) {
        if (this._contractAddress !== contractAddress &&
            (0, validation_js_1.isAddress)(contractAddress)) {
            this._contractAddress = contractAddress;
            console.log("Contract address is changed : ", this._contractAddress);
        }
        else {
            console.error("This is invalid address type");
        }
    }
    setCollectionId(collectionID) {
        if (this._collection !== collectionID) {
            this._collection = collectionID;
            console.log("Collection ID is changed : ", this._collection);
        }
        else {
            console.error("This is invalid collection ID type");
        }
    }
    getContractAddress() {
        return this._contractAddress.toString();
    }
    getCollectionId() {
        return this._collection.toString();
    }
    getCollectionInfo(collectionID) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = this._collection;
            if (collectionID !== undefined) {
                id = collectionID;
            }
            const res = yield information_js_1.default.getCollectionInfo(this._node, this._contractAddress, id);
            return res.data;
        });
    }
    // owner의 nft 갯수. TBD.
    // balanceOf() {}
    // tokenID의 소유자
    ownerOf(tokenID, collectionID) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = this._collection;
            if (collectionID !== undefined) {
                id = collectionID;
            }
            const res = yield information_js_1.default.getNftInfo(this._node, this._contractAddress, id, tokenID);
            return res.data.owner;
        });
    }
    // collection의 이름 반환
    name(collectionID) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = this._collection;
            if (collectionID !== undefined) {
                id = collectionID;
            }
            const res = yield information_js_1.default.getCollectionInfo(this._node, this._contractAddress, id);
            return res.data._embedded.policy.name;
        });
    }
    symbol() {
        return this._collection;
    }
    // 총 nft 발행량 조회
    totalSupply(collectionID) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = this._collection;
            if (collectionID !== undefined) {
                id = collectionID;
            }
            const res = yield information_js_1.default.getAllNftInfo(this._node, this._contractAddress, id);
            return res.data.length;
        });
    }
    // tokenID 에 대한 URI 반환
    tokenURI(tokenID, collectionID) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = this._collection;
            if (collectionID !== undefined) {
                id = collectionID;
            }
            const res = yield information_js_1.default.getNftInfo(this._node, this._contractAddress, id, tokenID);
            return res.data.uri;
        });
    }
    /** structure
     * collectionData = {
     *    name: string;
     *    symbol: string;
     *    uri: string;
     *    royalty: string | number | Buffer | BigInt | Uint8Array
     *    whiteLists: string[],
     * }
     */
    createCollection(sender, data, currencyID) {
        const token = new time_js_1.TimeStamp().UTC();
        const fact = new register_js_1.CollectionRegisterFact(token, sender, this._contractAddress, data.symbol, data.name, data.royalty, data.uri, data.whiteLists, currencyID);
        this.setCollectionId(data.symbol);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    /** structure
     * inputData = {
     *    name: string;
     *    symbol: string;
     *    uri: string;
     *    royalty: string | number | Buffer | BigInt | Uint8Array
     *    whiteLists: string[],
     * }
     */
    setPolicy(sender, data, currencyId) {
        const token = new time_js_1.TimeStamp().UTC();
        const fact = new updatePolicy_js_1.CollectionPolicyUpdaterFact(token, sender, this._contractAddress, data.symbol, data.name, data.royalty, data.uri, data.whiteLists, currencyId);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    mint(sender, uri, hash, currencyID, creator) {
        const originator = (0, sign_js_1.gererateCreator)([{ account: creator, share: 100 }]);
        const token = new time_js_1.TimeStamp().UTC();
        const item = new mint_js_1.MintItem(this._contractAddress, this._collection, hash, uri, originator, currencyID);
        const fact = new mint_js_1.MintFact(token, sender, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    mintForMultiCreators(sender, uri, hash, currencyID, creator) {
        const originators = (0, sign_js_1.gererateCreator)(creator);
        const token = new time_js_1.TimeStamp().UTC();
        const item = new mint_js_1.MintItem(this._contractAddress, this._collection, hash, uri, originators, currencyID);
        const fact = new mint_js_1.MintFact(token, sender, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    // nft 호환 컨트랙트 끼리의 안전한 전송. 이 함수가 오버로딩 되었다.
    transferFrom() { }
    // approve 위임받은 자의 전송
    transfer() { }
    // 위임
    approve(owner, operator, tokenID, currencyID) {
        const token = new time_js_1.TimeStamp().UTC();
        const item = new approve_js_1.ApproveItem(this._contractAddress, this._collection, operator, tokenID, currencyID);
        const fact = new approve_js_1.ApproveFact(token, owner, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    // tokenId 가 위임되었는지 확인
    getApproved(tokenID, collectionID) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = this._collection;
            if (collectionID !== undefined) {
                id = collectionID;
            }
            const res = yield information_js_1.default.getNftInfo(this._node, this._contractAddress, id, tokenID);
            return res.data.approved;
        });
    }
    // 소유한 모든 nft 를 위임
    setApprovalForAll(owner, operator, mode, currencyID) {
        const token = new time_js_1.TimeStamp().UTC();
        let approved = "allow";
        if (mode == false) {
            approved = "cancel";
        }
        const item = new delegate_js_1.DelegateItem(this._contractAddress, this._collection, operator, approved, currencyID);
        const fact = new delegate_js_1.DelegateFact(token, owner, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    // 모든 nft 를 위임하였냐
    isApprovedForAll(owner, collectionID) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = this._collection;
            if (collectionID !== undefined) {
                id = collectionID;
            }
            const res = yield information_js_1.default.getOperationInfo(this._node, this._contractAddress, id, owner);
            return res.data;
        });
    }
}
exports.Nft = Nft;
//# sourceMappingURL=index.js.map