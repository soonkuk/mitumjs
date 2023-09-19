import { CreateCollectionFact } from "./create-collection"
import { UpdateCollectionPolicyFact } from "./update-collection-policy"
import { MintItem, MintFact } from "./mint"
import { ApproveItem, ApproveFact } from "./approve"
import { DelegateItem, DelegateFact } from "./delegate"
import { TransferItem, TransferFact } from "./transfer"
import { SignItem, SignFact } from "./sign"

import { Signer, Signers } from "./signer"

import { ContractGenerator, Operation } from "../base"

import { Address } from "../../key"
import { CurrencyID } from "../../common"
import { Big, IP, LongString, TimeStamp } from "../../types"

type data = {
    name: string | LongString
    uri: string | LongString
    royalty: string | number | Big
    whitelist: (string | Address)[]
}

type Creator = {
    account: string | Address
    share: string | number | Big
}

export class NFT extends ContractGenerator {
    constructor(
        networkID: string,
        contract?: string | Address,
        api?: string | IP,
    ) {
        super(networkID, contract, api)
    }

    createCollection(
        sender: string | Address,
        data: data,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new CreateCollectionFact(
                TimeStamp.new().UTC(),
                sender,
                this.contract,
                data.name,
                data.royalty,
                data.uri,
                data.whitelist,
                currency,
            )
        )
    }

    setPolicy(
        sender: string | Address,
        data: data,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new UpdateCollectionPolicyFact(
                TimeStamp.new().UTC(),
                sender,
                this.contract,
                data.name,
                data.royalty,
                data.uri,
                data.whitelist,
                currency,
            ))
    }

    mint(
        sender: string | Address,
        uri: string | LongString,
        hash: string | LongString,
        creator: string | Address,
        currency: string | CurrencyID,
    ) {
        return new Operation(this.networkID, new MintFact(TimeStamp.new().UTC(), sender, [new MintItem(
            this.contract,
            hash,
            uri,
            new Signers(100, [new Signer(creator, 100, false)]),
            currency,
        )]))
    }

    mintForMultiCreators(
        sender: string | Address,
        uri: string | LongString,
        hash: string | LongString,
        currency: string | CurrencyID,
        creators: Creator[]
    ) {
        return new Operation(
            this.networkID,
            new MintFact(
                TimeStamp.new().UTC(),
                sender,
                [
                    new MintItem(
                        this.contract,
                        hash,
                        uri,
                        new Signers(
                            creators.reduce((prev, next) => prev + Big.from(next.share).v, 0),
                            creators.map(a => new Signer(a.account, a.share, false)),
                        ),
                        currency,
                    )
                ]
            )
        )
    }

    transfer(
        sender: string | Address,
        receiver: string | Address,
        nftID: string | number | Big,
        currency: string | CurrencyID,
    ) {
        const fact = new TransferFact(
            TimeStamp.new().UTC(),
            sender,
            [
                new TransferItem(
                    this.contract,
                    receiver,
                    nftID,
                    currency,
                )
            ]
        )

        return new Operation(this.networkID, fact)
    }

    approve(
        owner: string | Address,
        operator: string | Address,
        nftID: string | number | Big,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new ApproveFact(
                TimeStamp.new().UTC(),
                owner,
                [
                    new ApproveItem(
                        this.contract,
                        operator,
                        nftID,
                        currency,
                    )
                ]
            )
        )
    }

    setApprovalForAll(
        owner: string | Address,
        operator: string | Address,
        mode: "allow" | "cancel",
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new DelegateFact(
                TimeStamp.new().UTC(),
                owner,
                [
                    new DelegateItem(
                        this.contract,
                        operator,
                        mode,
                        currency,
                    )
                ]
            ),
        )
    }

    signNFT(
        creator: string | Address,
        nftID: string | number | Big,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new SignFact(
                TimeStamp.new().UTC(),
                creator,
                [
                    new SignItem(
                        this.contract,
                        nftID,
                        currency,
                    )
                ]
            )
        )
    }

    async getCollectionInfo() {
        throw new Error("unimplemented method")
    }

    async getCollectionPolicy() {
        throw new Error("unimplemented method")
    }

    async ownerOf(nftID: string | number | Big) {
        throw new Error("unimplemented method")
    }

    async name() {
        throw new Error("unimplemented method")
    }

    async getApproved(nftID: number) {
        throw new Error("unimplemented method")
    }

    async totalSupply() {
        throw new Error("unimplemented method")
    }

    async tokenURI(nftID: number) {
        throw new Error("unimplemented method")
    }

    async isApprovedForAll(owner: string) {
        throw new Error("unimplemented method")
    }

    async getNFTInfo(nftID: number) {
        throw new Error("unimplemented method")
    }
}