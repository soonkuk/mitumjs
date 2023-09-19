import { CreateServiceFact } from "./create-service"
import { AddControllerItem, AddControllerFact } from "./add-controller"
import { RemoveControllerItem, RemoveControllerFact } from "./remove-controller"
import { AddCustomerItem, AddCustomerFact } from "./add-customer"
import { UpdateCustomerItem, UpdateCustomerFact } from "./update-customer"

import { ContractGenerator, Operation } from "../base"

import { Address } from "../../key"
import { CurrencyID } from "../../common"
import { Bool, IP, TimeStamp } from "../../types"

export class KYC extends ContractGenerator {
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
            )
        )
    }

    addController(
        sender: string | Address,
        controller: string | Address,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new AddControllerFact(
                TimeStamp.new().UTC(),
                sender, [
                new AddControllerItem(
                    this.contract,
                    controller,
                    currency,
                )
            ]
            ),
        )
    }

    addCustomer(
        sender: string | Address,
        customer: string | Address,
        status: boolean | Bool,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new AddCustomerFact(
                TimeStamp.new().UTC(),
                sender, [
                new AddCustomerItem(
                    this.contract,
                    customer,
                    status,
                    currency,
                )
            ]
            )
        )
    }

    removeController(
        sender: string | Address,
        controller: string | Address,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new RemoveControllerFact(
                TimeStamp.new().UTC(),
                sender, [
                new RemoveControllerItem(
                    this.contract,
                    controller,
                    currency,
                )
            ]
            )
        )
    }

    updateCustomer(
        sender: string | Address,
        customer: string | Address,
        status: boolean | Bool,
        currency: string | CurrencyID,
    ) {
        return new Operation(
            this.networkID,
            new UpdateCustomerFact(
                TimeStamp.new().UTC(), sender, [new UpdateCustomerItem(
                    this.contract,
                    customer,
                    status,
                    currency,
                )]),
        )
    }
}