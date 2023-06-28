import { AxiosResponse } from "axios";
export declare class Nft {
    private _node;
    private _address;
    constructor(provider?: string);
    private _setNode;
    setAddress(contractAddress: string): void;
    ownerOf(collection: string, tokenID: number): Promise<AxiosResponse>;
    name(): void;
    Symbol(): void;
    tokenURI(): void;
    mint(): void;
    safeTransferFrom(): void;
    transferFrom(): void;
    approve(): void;
    getApproved(): void;
    setApprovalForAll(): void;
    isApprovedForAll(): void;
}
