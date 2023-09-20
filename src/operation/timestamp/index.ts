import { CreateServiceFact } from "./create-service"
import { AppendFact } from "./append"

import { ContractGenerator, Operation } from "../base"

import { Address } from "../../key"
import { CurrencyID } from "../../common"
import { contract, getAPIData } from "../../api"
import { Big, IP, TimeStamp as TS } from "../../types"

export class TimeStamp extends ContractGenerator {
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
                TS.new().UTC(),
                sender,
                this.contract,
                currency,
            )
        )
    }

    append(
        sender: string | Address,
        projectID: string,
        requestTimeStamp: string | number | Big,
        data: string,
        currency: string | CurrencyID,
    ) {
        const fact = new AppendFact(
            TS.new().UTC(),
            sender,
            this.contract,
            projectID,
            requestTimeStamp,
            data,
            currency,
        )

        return new Operation(this.networkID, fact)
    }

    async getServiceInfo() {
        return await getAPIData(() => contract.timestamp.getService(this.api, this.contract))
    }

    async getTimestampInfo(
        projectID: string,
        tid: string | number | Big,
    ) {
        return await getAPIData(() => contract.timestamp.getTimeStamp(this.api, this.contract, projectID, tid))
    }
}