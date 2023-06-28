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
class Nft {
    constructor(provider) {
        this._node = "";
        this._address = "";
        this._setNode(provider);
    }
    _setNode(provider) {
        if ((0, validation_js_1.isIPAddress)(provider)) {
            this._node = provider;
        }
    }
    setAddress(contractAddress) {
        if (this._address !== contractAddress && (0, validation_js_1.isAddress)(contractAddress)) {
            this._address = contractAddress;
            console.log("Contract address is changed : ", this._address);
        }
        else {
            console.error("This is invalid address type");
        }
    }
    // owner의 nft 갯수. TBD.
    // balanceOf() {}
    // tokenID의 소유자
    ownerOf(collection, tokenID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield information_js_1.default.getNftInfo(this._node, this._address, collection, tokenID);
        });
    }
    // token의 이름 반환
    name() { }
    // token의 심볼 반환
    Symbol() { }
    // tokenID 에 대한 URI 반환
    tokenURI() { }
    // nft 발행
    mint() { }
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