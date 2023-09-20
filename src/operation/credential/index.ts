import { CreateServiceFact } from "./create-service"
import { AddTemplateFact } from "./add-template"
import { AssignItem, AssignFact } from "./assign"
import { RevokeItem, RevokeFact } from "./revoke"

import { ContractGenerator, Operation } from "../base"

import { contract } from "../../api"
import { Address } from "../../key"
import { CurrencyID } from "../../common"
import { Big, Bool, IP, ShortDate, TimeStamp } from "../../types"

export class Credential extends ContractGenerator {
    constructor(
        networkID: string,
        contract?: string | Address,
        api?: string | IP,
    ) {
        super(networkID, contract, api)
    }

    createService(
        sender: string | Address,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new CreateServiceFact(
                TimeStamp.new().UTC(),
                sender,
                this.contract,
                currency,
            ),
        )
    }

    addTemplate(
        sender: string | Address,
        data: {
            templateID: string
            templateName: string
            serviceDate: string | ShortDate
            expirationDate: string | ShortDate
            templateShare: boolean | Bool
            multiAudit: boolean | Bool
            displayName: string
            subjectKey: string
            description: string
            creator: string | Address
        },
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new AddTemplateFact(
                TimeStamp.new().UTC(),
                sender,
                this.contract,
                data.templateID,
                data.templateName,
                data.serviceDate,
                data.expirationDate,
                data.templateShare,
                data.multiAudit,
                data.displayName,
                data.subjectKey,
                data.description,
                data.creator,
                currency,
            )
        )
    }

    issue(
        sender: string | Address,
        data: {
            holder: string | Address,
            templateID: string,
            id: string,
            value: string,
            validFrom: string | number | Big,
            validUntil: string | number | Big,
            did: string,
        },
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new AssignFact(
                TimeStamp.new().UTC(),
                sender,
                [
                    new AssignItem(
                        this.contract,
                        data.holder,
                        data.templateID,
                        data.id,
                        data.value,
                        data.validFrom,
                        data.validUntil,
                        data.did,
                        currency,
                    )
                ]
            )
        )
    }

    revoke(
        sender: string | Address,
        holder: string | Address,
        templateID: string,
        id: string,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new RevokeFact(
                TimeStamp.new().UTC(),
                sender,
                [
                    new RevokeItem(
                        this.contract,
                        holder,
                        templateID,
                        id,
                        currency,
                    )
                ]
            )
        )
    }

    async getIssuer() {
        return await contract.credential.getIssuer(this.api, this.contract)
    }

    async getCredentialInfo(
        templateID: string,
        credentialID: string,
    ) {
        return await contract.credential.getCredential(this.api, this.contract, templateID, credentialID)
    }

    async getTemplate(
        templateID: string,
    ) {
        return await contract.credential.getTemplate(this.api, this.contract, templateID)
    }

    async getAllCredentials(
        templateID: string,
    ) {
        return await contract.credential.getCredentials(this.api, this.contract, templateID)
    }

    async claimCredential(
        holder: string | Address,
    ) {
        return await contract.credential.getCredentialByHolder(this.api, this.contract, holder)
    }
}