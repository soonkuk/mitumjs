import { AxiosResponse } from "axios";

import { isIPAddress, isAddress } from "../../utils/validation.js";
import { OperationType } from "../../types/operation.js";
import { TimeStamp } from "../../utils/time.js";
import { Fact } from "../../types/fact.js";

import nftInfo from "./information.js";
import { MintItem, MintFact, gererateCreator } from "./mint.js";
import { Creator } from "./creatorType.js";
import { CollectionRegisterFact, inputData } from "./register.js";

export class Nft {
  private _networkID: string = "";
  private _node: string = "";
  private _address: string = "";
  private _collection: string = "";

  constructor(networkID: string, provider?: string) {
    this._setNode(provider);
    this._setChain(networkID);
  }

  private _setNode(provider?: string) {
    if (isIPAddress(provider)) {
      this._node = provider as string;
    }
  }

  private _setChain(networkID: string) {
    this._networkID = networkID;
  }

  setGallery(contractAddress: string, collectionID: string) {
    if (this._address !== contractAddress && isAddress(contractAddress)) {
      this._address = contractAddress;
      console.log("Contract address is changed : ", this._address);
    } else {
      console.error("This is invalid address type");
    }

    this.setCollection(collectionID);
  }

  setCollection(collectionID: string) {
    if (this._collection !== collectionID) {
      this._collection = collectionID;
      console.log("Collection ID is changed : ", this._collection);
    } else {
      console.error("This is invalid collection ID type");
    }
  }

  getContractAddress(): string {
    return this._address.toString();
  }

  getCollectionId(): string {
    return this._collection.toString();
  }

  // owner의 nft 갯수. TBD.
  // balanceOf() {}

  // tokenID의 소유자
  async ownerOf(tokenID: number): Promise<AxiosResponse> {
    return await nftInfo.getNftInfo(
      this._node,
      this._address,
      this._collection,
      tokenID
    );
  }

  // contract의 이름 반환
  name() {}

  symbol(): string {
    return this._collection;
  }

  // tokenID 에 대한 URI 반환
  tokenURI() {}

  /** structure
   * inputData = {
   *    contract: string;
   *    name: string;
   *    symbol: string;
   *    uri: string;
   *    royalty: string | number | Buffer | BigInt | Uint8Array
   *    whiteLists: Address[],
   *    currencyID: string
   * }
   */
  createCollection(sender: string, data: inputData) {
    const token = new TimeStamp().UTC();

    const fact = new CollectionRegisterFact(
      token,
      sender,
      data.contract,
      data.symbol,
      data.name,
      data.royalty,
      data.uri,
      data.whiteLists,
      data.currencyID
    );

    return new OperationType(this._networkID, fact);
  }

  mint(
    sender: string,
    uri: string,
    hash: string,
    currencyID: string,
    creator: string
  ): OperationType<Fact> {
    const originator = gererateCreator([{ account: creator, share: 100 }]);
    const token = new TimeStamp().UTC();

    const item = new MintItem(
      this._address,
      this._collection,
      hash,
      uri,
      originator,
      currencyID
    );
    const fact = new MintFact(token, sender, [item]);

    return new OperationType(this._networkID, fact);
  }

  mintForMultiCreators(
    sender: string,
    uri: string,
    hash: string,
    currencyID: string,
    creator: Creator[]
  ): OperationType<Fact> {
    const originators = gererateCreator(creator);
    const token = new TimeStamp().UTC();

    const item = new MintItem(
      this._address,
      this._collection,
      hash,
      uri,
      originators,
      currencyID
    );
    const fact = new MintFact(token, sender, [item]);

    return new OperationType(this._networkID, fact);
  }

  // nft 호환 컨트랙트 끼리의 안전한 전송. 이 함수가 오버로딩 되었다.
  safeTransferFrom() {}

  // approve 위임받은 자의 전송
  transferFrom() {}

  // 위임
  approve() {}

  // tokenId 가 위임되었는지 확인
  getApproved() {}

  // 소유한 모든 nft 를 위임
  setApprovalForAll() {}

  // 모든 nft 를 위임하였냐
  isApprovedForAll() {}
}
