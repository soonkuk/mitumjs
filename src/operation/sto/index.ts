import { CreateSecurityTokenItem, CreateSecurityTokenFact } from "./create-security-token"
import { IssueSecurityTokenItem, IssueSecurityTokenFact } from "./issue-sercurity-token"
import { AuthorizeOperatorItem, AuthorizeOperatorFact } from "./authorize-operator"
import { RevokeOperatorItem, RevokeOperatorFact } from "./revoke-operator"
import { RedeemTokenItem, RedeemTokenFact } from "./redeem-token"
import { SetDocumentFact } from "./set-document"
import { TransferSecurityTokenPartitionItem, TransferSecurityTokenPartitionFact } from "./transfer-security-token-partition"

import { Partition } from "./partition"

import { ContractGenerator, Operation } from "../base"

import { Address } from "../../key"
import { CurrencyID } from "../../common"
import { Big, IP, TimeStamp } from "../../types"

type data = {
    granularity: string | number | Big
    defaultPartition: string | Partition
    controllers: (string | Address)[]
}

export class STO extends ContractGenerator {
    constructor(
        networkID: string,
        contract?: string | Address,
        api?: string | IP,
    ) {
        super(networkID, contract, api)
    }

    authorizeOperator(
        sender: string | Address,
        operator: string | Address,
        partition: string | Partition,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new AuthorizeOperatorFact(
                TimeStamp.new().UTC(),
                sender,
                [
                    new AuthorizeOperatorItem(
                        this.contract,
                        operator,
                        partition,
                        currency,
                    )
                ]
            )
        )
    }

    createService(
        sender: string | Address,
        data: data,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new CreateSecurityTokenFact(
                TimeStamp.new().UTC(),
                sender,
                [
                    new CreateSecurityTokenItem(
                        this.contract,
                        data.granularity,
                        data.defaultPartition,
                        data.controllers,
                        currency,
                    )
                ]
            ),
        )
    }

    issue(
        sender: string | Address,
        receiver: string | Address,
        partition: string | Partition,
        amount: string | number | Big,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new IssueSecurityTokenFact(
                TimeStamp.new().UTC(),
                sender,
                [
                    new IssueSecurityTokenItem(
                        this.contract,
                        receiver,
                        amount,
                        partition,
                        currency,
                    )
                ]
            )
        )
    }

    redeem(
        sender: string | Address,
        tokenHolder: string | Address,
        partition: string | Partition,
        amount: string | number | Big,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new RedeemTokenFact(
                TimeStamp.new().UTC(),
                sender,
                [
                    new RedeemTokenItem(
                        this.contract,
                        tokenHolder,
                        amount,
                        partition,
                        currency,
                    )
                ]
            )
        )
    }

    revokeOperator(
        sender: string | Address,
        operator: string | Address,
        partition: string | Partition,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new RevokeOperatorFact(
                TimeStamp.new().UTC(),
                sender,
                [
                    new RevokeOperatorItem(
                        this.contract,
                        operator,
                        partition,
                        currency,
                    )
                ]
            )
        )
    }

    setDocument(
        sender: string | Address,
        title: string,
        uri: string,
        documentHash: string,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new SetDocumentFact(
                TimeStamp.new().UTC(),
                sender,
                this.contract,
                title,
                uri,
                documentHash,
                currency,
            )
        )
    }

    transferByPartition(
        sender: string | Address,
        holder: string | Address,
        receiver: string | Address,
        partition: string | Partition,
        amount: string | number | Big,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new TransferSecurityTokenPartitionFact(
                TimeStamp.new().UTC(),
                sender,
                [
                    new TransferSecurityTokenPartitionItem(
                        this.contract,
                        holder,
                        receiver,
                        partition,
                        amount,
                        currency,
                    )
                ]
            )
        )
    }
}