import { Assert, MitumError, ECODE } from "../../utils/error.js";
import { OperationFact } from "../../types/fact.js";
import { CredentialsItem } from "./item.js";
import { Big } from "../../utils/math.js";
import { String } from "../../types/string.js";
const AssignCredentialsItemHint = "mitum-credential-assign-credentials-item";
const AssignCredentialsFactHint = "mitum-credential-assign-credentials-operation-fact";
const AssignCredentialsHint = "mitum-credential-assign-credentials-operation";
const MaxAssignCredentialsItems = 10;
export class AssignCredentialsItem extends CredentialsItem {
    constructor(contract, credentialServiceID, holder, templateID, id, value, validfrom, validuntil, did, currency) {
        super(AssignCredentialsItemHint, contract, credentialServiceID, holder, templateID, id, currency);
        this.value = new String(value);
        this.validfrom = new Big(validfrom);
        this.validuntil = new Big(validuntil);
        this.did = new String(did);
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
        return {
            ...super.toHintedObject(),
            value: this.value.toString(),
            validfrom: this.validfrom.v,
            validuntil: this.validuntil.v,
            did: this.did.toString(),
        };
    }
}
export class AssignCredentialsFact extends OperationFact {
    constructor(token, sender, items) {
        super(AssignCredentialsFactHint, token, sender, items);
        items.forEach((item) => {
            Assert.check(item instanceof AssignCredentialsItem, MitumError.detail(ECODE.INVALID_PARAMETER, "The type of items is incorrect."));
            Assert.check(item.contract.toString() !== sender, MitumError.detail(ECODE.INVALID_PARAMETER, "The contract address is the same as the sender address."));
        });
        Assert.check(items.length <= MaxAssignCredentialsItems, MitumError.detail(ECODE.INVALID_PARAMETER, "The number of elements in items is too many."));
        const iSet = new Set(items.map((item) => item.toString()));
        Assert.check(iSet.size === items.length, MitumError.detail(ECODE.INVALID_PARAMETER, "There are duplicate elements in items."));
    }
    get operationHint() {
        return AssignCredentialsHint;
    }
}
//# sourceMappingURL=assign.js.map