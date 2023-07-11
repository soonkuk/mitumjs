import { isIPAddress, isAddress } from "../../utils/validation.js";
import { OperationType } from "../../types/operation.js";
import { TimeStamp } from "../../utils/time.js";
import { CollectionRegisterFact } from "./register.js";
import { DelegateItem, DelegateFact } from "./delegate.js";
import { CollectionPolicyUpdaterFact } from "./updatePolicy.js";
import { ApproveFact, ApproveItem } from "./approve.js";
import { MintItem, MintFact } from "./mint.js";
import { gererateCreator } from "./sign.js";
import nftInfo from "./information.js";
export class Nft {
    constructor(networkID, provider) {
        this._networkID = "";
        this._node = "";
        this._contractAddress = "";
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
    setContractAddress(contractAddress) {
        if (this._contractAddress !== contractAddress &&
            isAddress(contractAddress)) {
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
    async getCollectionInfo(collectionID) {
        let id = this._collection;
        if (collectionID !== undefined) {
            id = collectionID;
        }
        const res = await nftInfo.getCollectionInfo(this._node, this._contractAddress, id);
        return res.data;
    }
    async getCollectionPolicy(collectionID) {
        let id = this._collection;
        if (collectionID !== undefined) {
            id = collectionID;
        }
        const res = await nftInfo.getCollectionInfo(this._node, this._contractAddress, id);
        return res.data._embedded.policy;
    }
    // owner의 nft 갯수. TBD.
    // balanceOf() {}
    async ownerOf(tokenID, collectionID) {
        let id = this._collection;
        if (collectionID !== undefined) {
            id = collectionID;
        }
        const res = await nftInfo.getNftInfo(this._node, this._contractAddress, id, tokenID);
        return res.data._embedded.owner;
    }
    async name(collectionID) {
        let id = this._collection;
        if (collectionID !== undefined) {
            id = collectionID;
        }
        const res = await nftInfo.getCollectionInfo(this._node, this._contractAddress, id);
        return res.data._embedded.policy.name;
    }
    symbol() {
        return this.getCollectionId();
    }
    // 총 nft 발행량 조회 //// 여기부터 할 차례임...
    async totalSupply(collectionID) {
        let id = this._collection;
        if (collectionID !== undefined) {
            id = collectionID;
        }
        const res = await nftInfo.getAllNftInfo(this._node, this._contractAddress, id);
        return res.data.length;
    }
    // tokenID 에 대한 URI 반환
    async tokenURI(tokenID, collectionID) {
        let id = this._collection;
        if (collectionID !== undefined) {
            id = collectionID;
        }
        const res = await nftInfo.getNftInfo(this._node, this._contractAddress, id, tokenID);
        return res.data._embedded.uri;
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
        const token = new TimeStamp().UTC();
        const fact = new CollectionRegisterFact(token, sender, this._contractAddress, data.symbol, data.name, data.royalty, data.uri, data.whiteLists, currencyID);
        this.setCollectionId(data.symbol);
        return new OperationType(this._networkID, fact);
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
        const token = new TimeStamp().UTC();
        const fact = new CollectionPolicyUpdaterFact(token, sender, this._contractAddress, data.symbol, data.name, data.royalty, data.uri, data.whiteLists, currencyId);
        return new OperationType(this._networkID, fact);
    }
    mint(sender, uri, hash, currencyID, creator) {
        const originator = gererateCreator([{ account: creator, share: 100 }]);
        const token = new TimeStamp().UTC();
        const item = new MintItem(this._contractAddress, this._collection, hash, uri, originator, currencyID);
        const fact = new MintFact(token, sender, [item]);
        return new OperationType(this._networkID, fact);
    }
    mintForMultiCreators(sender, uri, hash, currencyID, creator) {
        const originators = gererateCreator(creator);
        const token = new TimeStamp().UTC();
        const item = new MintItem(this._contractAddress, this._collection, hash, uri, originators, currencyID);
        const fact = new MintFact(token, sender, [item]);
        return new OperationType(this._networkID, fact);
    }
    // nft 호환 컨트랙트 끼리의 안전한 전송. 이 함수가 오버로딩 되었다.
    transferFrom() { }
    // approve 위임받은 자의 전송
    transfer() { }
    // 위임
    approve(owner, operator, tokenID, currencyID) {
        const token = new TimeStamp().UTC();
        const item = new ApproveItem(this._contractAddress, this._collection, operator, tokenID, currencyID);
        const fact = new ApproveFact(token, owner, [item]);
        return new OperationType(this._networkID, fact);
    }
    // tokenId 가 위임되었는지 확인
    async getApproved(tokenID, collectionID) {
        let id = this._collection;
        if (collectionID !== undefined) {
            id = collectionID;
        }
        const res = await nftInfo.getNftInfo(this._node, this._contractAddress, id, tokenID);
        return res.data.approved;
    }
    // 소유한 모든 nft 를 위임
    setApprovalForAll(owner, operator, mode, currencyID) {
        const token = new TimeStamp().UTC();
        let approved = "allow";
        if (mode == false) {
            approved = "cancel";
        }
        const item = new DelegateItem(this._contractAddress, this._collection, operator, approved, currencyID);
        const fact = new DelegateFact(token, owner, [item]);
        return new OperationType(this._networkID, fact);
    }
    // 모든 nft 를 위임하였냐
    async isApprovedForAll(owner, collectionID) {
        let id = this._collection;
        if (collectionID !== undefined) {
            id = collectionID;
        }
        const res = await nftInfo.getOperationInfo(this._node, this._contractAddress, id, owner);
        return res.data;
    }
}
//# sourceMappingURL=index.js.map