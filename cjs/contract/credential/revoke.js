"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevokeCredentialsFact = exports.RevokeCredentialsItem = void 0;
const error_js_1 = require("../../utils/error.js");
const fact_js_1 = require("../../types/fact.js");
const item_js_1 = require("./item.js");
const RevokeCredentialsItemHint = "mitum-credential-revoke-credentials-item";
const RevokeCredentialsFactHint = "mitum-credential-revoke-credentials-operation-fact";
const RevokeCredentialsHint = "mitum-credential-revoke-credentials-operation";
const MaxRevokeCredentialsItems = 20;
class RevokeCredentialsItem extends item_js_1.CredentialsItem {
    constructor(contract, credentialServiceID, holder, templateID, id, currency) {
        super(RevokeCredentialsItemHint, contract, credentialServiceID, holder, templateID, id, currency);
    }
    toBuffer() {
        return Buffer.concat([super.toBuffer(), this.currency.toBuffer()]);
    }
    toString() {
        return super.toString();
    }
    toHintedObject() {
        return Object.assign({}, super.toHintedObject());
    }
}
exports.RevokeCredentialsItem = RevokeCredentialsItem;
class RevokeCredentialsFact extends fact_js_1.OperationFact {
    constructor(token, sender, items) {
        super(RevokeCredentialsFactHint, token, sender, items);
        items.forEach((item) => {
            error_js_1.Assert.check(item instanceof RevokeCredentialsItem, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The type of items is incorrect."));
            error_js_1.Assert.check(item.contract.toString() !== sender, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The contract address is the same as the sender address."));
        });
        error_js_1.Assert.check(items.length <= MaxRevokeCredentialsItems, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "The number of elements in items is too many."));
        const iSet = new Set(items.map((item) => item.toString()));
        error_js_1.Assert.check(iSet.size === items.length, error_js_1.MitumError.detail(error_js_1.ECODE.INVALID_PARAMETER, "There are duplicate elements in items."));
    }
    get operationHint() {
        return RevokeCredentialsHint;
    }
}
exports.RevokeCredentialsFact = RevokeCredentialsFact;
//# sourceMappingURL=revoke.js.map