"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignCredentialsFact = exports.AssignCredentialsItem = void 0;
const error_js_1 = require("../../utils/error.js");
const fact_js_1 = require("../../types/fact.js");
const item_js_1 = require("./item.js");
const math_js_1 = require("../../utils/math.js");
const string_js_1 = require("../../types/string.js");
const AssignCredentialsItemHint = "mitum-credential-assign-credentials-item";
const AssignCredentialsFactHint = "mitum-credential-assign-credentials-operation-fact";
const AssignCredentialsHint = "mitum-credential-assign-credentials-operation";
const MaxAssignCredentialsItems = 10;
class AssignCredentialsItem extends item_js_1.CredentialsItem {
    constructor(contract, credentialServiceID, holder, templateID, id, value, validfrom, validuntil, did, currency) {
        super(AssignCredentialsItemHint, contract, credentialServiceID, holder, templateID, id, currency);
        this.value = new string_js_1.String(value);
        this.validfrom = new math_js_1.Big(validfrom);
        this.validuntil = new math_js_1.Big(validuntil);
        this.did = new string_js_1.String(did);
    }
    toString() {
        return this.value.toString();
    }
    toBuffer() {
        return Buffer.concat([
            super.toBuffer(),
            this.value.toBuffer(),
            this.validfrom.toBuffer("fill"),
            this.validuntil.toBuffer("fill"),
            this.did.toBuffer(),
            this.currency.toBuffer(),
        ]);
    }
    toHintedObject() {
        return Object.assign(Object.assign({}, super.toHintedObject()), { value: this.value.toString(), validfrom: this.validfrom.v, validuntil: this.validuntil.v, did: this.did.toString() });
    }
}
exports.AssignCredentialsItem = AssignCredentialsItem;
class AssignCredentialsFact extends fact_js_1.OperationFact {
    constructor(token, sender, items) {
        super(AssignCredentialsFactHint, token, sender, items);
        items.forEach((item) => {
            error_js_1.Assert.check(item instanceof AssignCredentialsItem, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The type of items is incorrect."));
            error_js_1.Assert.check(item.contract.toString() !== sender, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The contract address is the same as the sender address."));
        });
        error_js_1.Assert.check(items.length <= MaxAssignCredentialsItems, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The number of elements in items is too many."));
        const iSet = new Set(items.map((item) => item.toString()));
        error_js_1.Assert.check(iSet.size === items.length, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "There are duplicate elements in items."));
    }
    get operationHint() {
        return AssignCredentialsHint;
    }
}
exports.AssignCredentialsFact = AssignCredentialsFact;
//# sourceMappingURL=assign.js.map