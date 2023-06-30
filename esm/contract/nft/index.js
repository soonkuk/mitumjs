import { isIPAddress, isAddress } from "../../utils/validation.js";
import nftInfo from "./information.js";
import { MintItem, MintFact } from "./mint.js";
import { OperationType } from "../../types/operation.js";
import { NFTSigner, NFTSigners } from "./sign.js";
import { TimeStamp } from "../../utils/time.js";
export class Nft {
    constructor(networkID, provider) {
        this._networkID = "";
        this._node = "";
        this._address = "";
        this._collection = "";
        this._setNode(provider);
        this._setChain(networkID);
    }
    _setNode(provider) {
        if (isIPAddress(provider)) {
            this._node = provider;
        }
    }
    _setChain(networkID) {
        this._networkID = networkID;
    }
    setGallery(contractAddress, collectionID) {
        if (this._address !== contractAddress && isAddress(contractAddress)) {
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
    async ownerOf(tokenID) {
        return await nftInfo.getNftInfo(this._node, this._address, this._collection, tokenID);
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
            const nftsigner = new NFTSigner(account, share);
            total += Number(share);
            nftsigners.push(nftsigner);
        });
        return new NFTSigners(total, nftsigners);
    }
    mint(sender, uri, hash, currencyID, creator) {
        const originator = this.gererateCreator([{ account: creator, share: 100 }]);
        const token = new TimeStamp().UTC();
        const item = new MintItem(this._address, this._collection, hash, uri, originator, currencyID);
        const fact = new MintFact(token, sender, [item]);
        return new OperationType(this._networkID, fact);
    }
    mintForMultiCreators(sender, uri, hash, currencyID, creator) {
        const originators = this.gererateCreator(creator);
        const token = new TimeStamp().UTC();
        const item = new MintItem(this._address, this._collection, hash, uri, originators, currencyID);
        const fact = new MintFact(token, sender, [item]);
        return new OperationType(this._networkID, fact);
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
//# sourceMappingURL=index.js.map