import { CreateServiceFact } from "./create-service"
import { AddTemplateFact } from "./add-template"
import { AssignItem, AssignFact } from "./assign"
import { RevokeItem, RevokeFact } from "./revoke"

import { ContractGenerator, Operation } from "../base"

import { Address } from "../../key"
import { contract } from "../../api"
import { ContractID, CurrencyID } from "../../common"
import { Big, Bool, IP, ShortDate, TimeStamp } from "../../types"

export class Credential extends ContractGenerator {
    constructor(
        networkID: string,
        contract?: string | Address,
        node?: string | IP,
    ) {
        super(networkID, contract, node)
    }

    createService(
        sender: string | Address,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new CreateServiceFact(
                new TimeStamp().UTC(),
                sender,
                this.contract,
                this.serviceID,
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
                new TimeStamp().UTC(),
                sender,
                this.contract,
                this.serviceID,
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
                new TimeStamp().UTC(),
                sender,
                [
                    new AssignItem(
                        this.contract,
                        this.serviceID,
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
                new TimeStamp().UTC(),
                sender,
                [
                    new RevokeItem(
                        this.contract,
                        this.serviceID,
                        holder,
                        templateID,
                        id,
                        currency,
                    )
                ]
            )
        )
    }

    async getServiceInfo(serviceID?: string | ContractID) {
        const res = await contract.credential.getService(
            this.node,
            this.contract,
            serviceID ?? this.serviceID,
        )
        return res.data
    }

    async getCredentialInfo(
        serviceID?: string | ContractID,
        
    )
}