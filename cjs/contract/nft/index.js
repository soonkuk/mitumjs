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
const information_js_1 = __importDefault(require("./information.js"));
const mint_js_1 = require("./mint.js");
const operation_js_1 = require("../../types/operation.js");
const sign_js_1 = require("./sign.js");
const time_js_1 = require("../../utils/time.js");
class Nft {
    constructor(networkID, provider) {
        this._networkID = "";
        this._node = "";
        this._address = "";
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
    setGallery(contractAddress, collectionID) {
        if (this._address !== contractAddress && (0, validation_js_1.isAddress)(contractAddress)) {
            this._address = contractAddress;
            console.log("Contract address is changed : ", this._address);
        }
        else {
            console.error("This is invalid address type");
        }
        this.setCollection(collectionID);
    }
    setCollection(collectionID) {
        if (this._collection !== collectionID) {
            this._collection = collectionID;
            console.log("Collection ID is changed : ", this._collection);
        }
        else {
            console.error("This is invalid collection ID type");
        }
    }
    getContractAddress() {
        return this._address.toString();
    }
    getCollectionId() {
        return this._collection.toString();
    }
    // owner의 nft 갯수. TBD.
    // balanceOf() {}
    // tokenID의 소유자
    ownerOf(tokenID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield information_js_1.default.getNftInfo(this._node, this._address, this._collection, tokenID);
        });
    }
    // contract의 이름 반환
    name() { }
    symbol() {
        return this._collection;
    }
    // tokenID 에 대한 URI 반환
    tokenURI() { }
    gererateCreator(originators) {
        const nftsigners = [];
        let total = 0;
        originators.forEach((originator) => {
            const { account, share } = originator;
            const nftsigner = new sign_js_1.NFTSigner(account, share);
            total += Number(share);
            nftsigners.push(nftsigner);
        });
        return new sign_js_1.NFTSigners(total, nftsigners);
    }
    mint(sender, uri, hash, currencyID, creator) {
        const originator = this.gererateCreator([{ account: creator, share: 100 }]);
        const token = new time_js_1.TimeStamp().UTC();
        const item = new mint_js_1.MintItem(this._address, this._collection, hash, uri, originator, currencyID);
        const fact = new mint_js_1.MintFact(token, sender, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    mintForMultiCreators(sender, uri, hash, currencyID, creator) {
        const originators = this.gererateCreator(creator);
        const token = new time_js_1.TimeStamp().UTC();
        const item = new mint_js_1.MintItem(this._address, this._collection, hash, uri, originators, currencyID);
        const fact = new mint_js_1.MintFact(token, sender, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    // nft 호환 컨트랙트 끼리의 안전한 전송. 이 함수가 오버로딩 되었다.
    safeTransferFrom() { }
    // approve 위임받은 자의 전송
    transferFrom() { }
    // 위임
    approve() { }
    // tokenId 가 위임되었는지 확인
    getApproved() { }
    // 소유한 모든 nft 를 위임
    setApprovalForAll() { }
    // 모든 nft 를 위임하였냐
    isApprovedForAll() { }
}
exports.Nft = Nft;
//# sourceMappingURL=index.js.map