"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateKYCServiceFact = void 0;
const property_js_1 = require("../../types/property.js");
const fact_js_1 = require("../../types/fact.js");
const address_js_1 = require("../../account/address.js");
const error_js_1 = require("../../utils/error.js");
const math_js_1 = require("../../utils/math.js");
const CreateKYCServiceFactHint = "mitum-kyc-create-key-service-operation-fact";
const CreateKYCServiceHint = "mitum-kyc-create-key-service-operation";
class CreateKYCServiceFact extends fact_js_1.Fact {
    constructor(token, sender, contract, serviceId, controllers, currency) {
        super(CreateKYCServiceFactHint, token);
        this.sender = new address_js_1.Address(sender);
        this.contract = new address_js_1.Address(contract);
        this.serviceId = new property_js_1.ContractID(serviceId);
        this.currency = new property_js_1.CurrencyID(currency);
        const cSet = new Set(controllers);
        error_js_1.Assert.check(cSet.size === controllers.length, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "There are duplicate elements in controllers."));
        this.controllers = controllers.map((c) => new address_js_1.Address(c));
        this._hash = this.hashing();
    }
    toBuffer() {
        return Buffer.concat([
            this.token.toBuffer(),
            this.sender.toBuffer(),
            this.contract.toBuffer(),
            this.serviceId.toBuffer(),
            Buffer.concat(this.controllers.sort(math_js_1.SortFunc).map((c) => c.toBuffer())),
            this.currency.toBuffer(),
        ]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { sender: this.sender.toString(), contract: this.contract.toString(), kycid: this.serviceId.toString(), controllers: this.controllers.sort(math_js_1.SortFunc).map((c) => c.toString()), currency: this.currency.toString() });
    }
    get operationHint() {
        return CreateKYCServiceHint;
    }
}
exports.CreateKYCServiceFact = CreateKYCServiceFact;
//# sourceMappingURL=create.js.map