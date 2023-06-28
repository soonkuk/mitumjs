import { isIPAddress, isAddress } from "../../utils/validation.js";
import nftInfo from "./information.js";
export class Nft {
    constructor(provider) {
        this._node = "";
        this._address = "";
        this._setNode(provider);
    }
    _setNode(provider) {
        if (isIPAddress(provider)) {
            this._node = provider;
        }
    }
    setAddress(contractAddress) {
        if (this._address !== contractAddress && isAddress(contractAddress)) {
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
    async ownerOf(collection, tokenID) {
        return await nftInfo.getNftInfo(this._node, this._address, collection, tokenID);
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
//# sourceMappingURL=index.js.map