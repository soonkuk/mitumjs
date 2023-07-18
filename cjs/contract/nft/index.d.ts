/// <reference types="node" />
import { AxiosResponse } from "axios";
import { OperationType } from "../../types/operation.js";
import { Fact } from "../../types/fact.js";
import { collectionData } from "./register.js";
import { DelegateFact } from "./delegate.js";
import { Creator } from "./creatorType.js";
import { NFTTransferFact } from "./transfer.js";
export declare class Nft {
    private _networkID;
    private _node;
    private _contractAddress;
    private _collection;
    constructor(networkID: string, provider?: string);
    private _setNode;
    private _setChain;
    setContractAddress(contractAddress: string): void;
    setCollectionId(collectionID: string): void;
    getContractAddress(): string;
    getCollectionId(): string;
    getCollectionInfo(collectionID?: string): Promise<AxiosResponse | null>;
    getCollectionPolicy(collectionID?: string): Promise<AxiosResponse | null>;
    ownerOf(tokenID: number, collectionID?: string): Promise<AxiosResponse | null>;
    name(collectionID?: string): Promise<AxiosResponse | null>;
    symbol(): string;
    totalSupply(collectionID?: string): Promise<AxiosResponse | null>;
    tokenURI(tokenID: number, collectionID?: string): Promise<AxiosResponse | null>;
    /** structure
     * collectionData = {
     *    name: string;
     *    symbol: string;
     *    uri: string;
     *    royalty: string | number | Buffer | BigInt | Uint8Array
     *    whiteLists: string[],
     * }
     */
    createCollection(sender: string, data: collectionData, currencyID: string): OperationType<Fact>;
    /** structure
     * inputData = {
     *    name: string;
     *    symbol: string;
     *    uri: string;
     *    royalty: string | number | Buffer | BigInt | Uint8Array
     *    whiteLists: string[],
     * }
     */
    setPolicy(sender: string, data: collectionData, currencyId: string): OperationType<Fact>;
    mint(sender: string, uri: string, hash: string, currencyID: string, creator: string): OperationType<Fact>;
    mintForMultiCreators(sender: string, uri: string, hash: string, currencyID: string, creator: Creator[]): OperationType<Fact>;
    transfer(sender: string, receiver: string, tokenId: string | number | Buffer | BigInt | Uint8Array, currencyId: string): OperationType<NFTTransferFact>;
    approve(owner: string, operator: string, tokenID: string | number | Buffer | BigInt | Uint8Array, currencyID: string): OperationType<Fact>;
    getApproved(tokenID: number, collectionID?: string): Promise<AxiosResponse | null>;
    setApprovalForAll(owner: string, operator: string, mode: boolean, currencyID: string): OperationType<DelegateFact>;
    isApprovedForAll(owner: string, collectionID?: string): Promise<AxiosResponse | null>;
    getNFTInfo(tokenID: number, collectionID?: string): Promise<AxiosResponse | null>;
}
