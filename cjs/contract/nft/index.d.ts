/// <reference types="node" />
import { AxiosResponse } from "axios";
import { OperationType } from "../../types/operation.js";
import { Fact } from "../../types/fact.js";
import { Creator } from "./creatorType.js";
import { CollectionRegisterFact, inputData } from "./register.js";
import { DelegateFact } from "./delegate.js";
export declare class Nft {
    private _networkID;
    private _node;
    private _address;
    private _collection;
    constructor(networkID: string, provider?: string);
    private _setNode;
    private _setChain;
    setGallery(contractAddress: string, collectionID?: string): void;
    setCollection(collectionID: string): void;
    getContractAddress(): string;
    getCollectionId(): string;
    getCollectionInfo(collectionID?: string): Promise<AxiosResponse>;
    ownerOf(tokenID: number, collectionID?: string): Promise<AxiosResponse>;
    name(collectionID?: string): Promise<AxiosResponse>;
    symbol(): string;
    totalSupply(collectionID?: string): Promise<AxiosResponse>;
    tokenURI(tokenID: number, collectionID?: string): Promise<AxiosResponse>;
    /** structure
     * inputData = {
     *    contract: string;
     *    name: string;
     *    symbol: string;
     *    uri: string;
     *    royalty: string | number | Buffer | BigInt | Uint8Array
     *    whiteLists: string[],
     *    currencyID: string
     * }
     */
    createCollection(sender: string, data: inputData): OperationType<CollectionRegisterFact>;
    /** structure
     * inputData = {
     *    contract: string;
     *    name: string;
     *    symbol: string;
     *    uri: string;
     *    royalty: string | number | Buffer | BigInt | Uint8Array
     *    whiteLists: string[],
     *    currencyID: string
     * }
     */
    setPolicy(sender: string, data: inputData): OperationType<Fact>;
    mint(sender: string, uri: string, hash: string, currencyID: string, creator: string): OperationType<Fact>;
    mintForMultiCreators(sender: string, uri: string, hash: string, currencyID: string, creator: Creator[]): OperationType<Fact>;
    transferFrom(): void;
    transfer(): void;
    approve(owner: string, operator: string, tokenID: string | number | Buffer | BigInt | Uint8Array, currencyID: string): OperationType<Fact>;
    getApproved(tokenID: number, collectionID?: string): Promise<AxiosResponse>;
    setApprovalForAll(owner: string, operator: string, mode: boolean, currencyID: string): OperationType<DelegateFact>;
    isApprovedForAll(owner: string, collectionID?: string): Promise<AxiosResponse>;
}
