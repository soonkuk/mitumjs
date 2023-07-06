import { Assert, MitumError, ECODE } from "../../utils/error.js";
import { OperationFact } from "../../types/fact.js";
import { CredentialsItem } from "./item.js";
const RevokeCredentialsItemHint = "mitum-credential-revoke-credentials-item";
const RevokeCredentialsFactHint = "mitum-credential-revoke-credentials-operation-fact";
const RevokeCredentialsHint = "mitum-credential-revoke-credentials-operation";
const MaxRevokeCredentialsItems = 10;
export class RevokeCredentialsItem extends CredentialsItem {
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
        return { ...super.toHintedObject() };
    }
}
export class RevokeCredentialsFact extends OperationFact {
    constructor(token, sender, items) {
        super(RevokeCredentialsFactHint, token, sender, items);
        items.forEach((item) => {
            Assert.check(item instanceof RevokeCredentialsItem, MitumError.detail(ECODE.INVALID_PARAMETER, "The type of items is incorrect."));
            Assert.check(item.contract.toString() !== sender, MitumError.detail(ECODE.INVALID_PARAMETER, "The contract address is the same as the sender address."));
        });
        Assert.check(items.length <= MaxRevokeCredentialsItems, MitumError.detail(ECODE.INVALID_PARAMETER, "The number of elements in items is too many."));
        const iSet = new Set(items.map((item) => item.toString()));
        Assert.check(iSet.size === items.length, MitumError.detail(ECODE.INVALID_PARAMETER, "There are duplicate elements in items."));
    }
    get operationHint() {
        return RevokeCredentialsHint;
    }
}
//# sourceMappingURL=revoke.js.map