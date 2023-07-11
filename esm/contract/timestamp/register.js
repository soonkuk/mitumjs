import { ContractID, CurrencyID } from "../../types/property.js";
import { Fact } from "../../types/fact.js";
import { Address } from "../../account/address.js";
const ServiceRegisterFactHint = "mitum-timestamp-service-register-operation-fact";
const ServiceRegisterHint = "mitum-timestamp-service-register-operation";
export class ServiceRegisterFact extends Fact {
    constructor(token, sender, contract, serviceID, currency) {
        super(ServiceRegisterFactHint, token);
        this.sender = new Address(sender);
        this.contract = new Address(contract);
        this.serviceID = new ContractID(serviceID);
        this.currency = new CurrencyID(currency);
        this._hash = this.hashing();
    }
    toBuffer() {
        return Buffer.concat([
            this.token.toBuffer(),
            this.sender.toBuffer(),
            this.contract.toBuffer(),
            this.serviceID.toBuffer(),
            this.currency.toBuffer(),
        ]);
    }
    toHintedObject() {
        return {
            ...super.toHintedObject(),
            sender: this.sender.toString(),
            target: this.contract.toString(),
            service: this.serviceID.toString(),
            currency: this.currency.toString(),
        };
    }
    get operationHint() {
        return ServiceRegisterHint;
    }
}
//# sourceMappingURL=register.js.map