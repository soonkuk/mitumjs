import { OperationType } from "../../types/operation.js";
import { isIPAddress } from "../../utils/validation.js";
import { isAddress } from "../../utils/validation.js";
import { TimeStamp } from "../../utils/time.js";
import { AssignCredentialsFact, AssignCredentialsItem } from "./assign.js";
import { RevokeCredentialsFact, RevokeCredentialsItem } from "./revoke.js";
import { CreateCredentialServiceFact } from "./create.js";
import { AddTemplateFact } from "./template.js";
import credentialInfo from "./information.js";
export class Credential {
    constructor(networkID, provider) {
        this._networkID = "";
        this._node = "";
        this._address = "";
        this._credentialID = "";
        this._setNode(provider);
        this._setChain(networkID);
    }
    _setNode(provider) {
        if (isIPAddress(provider)) {
            this._node = provider;
        }
    }
    _setChain(networkID) {
        this._networkID = networkID;
    }
    setContractAddress(contractAddress) {
        if (this._address !== contractAddress && isAddress(contractAddress)) {
            this._address = contractAddress;
            console.log("Contract address is changed : ", this._address);
        }
        else {
            console.error("This is invalid address type");
        }
    }
    setCredentialId(_credentialID) {
        if (this._credentialID !== _credentialID) {
            this._credentialID = _credentialID;
            console.log("Collection ID is changed : ", this._credentialID);
        }
        else {
            console.error("This is invalid collection ID type");
        }
    }
    getContractAddress() {
        return this._address.toString();
    }
    getCredentialId() {
        return this._credentialID.toString();
    }
    createCredential(sender, currency) {
        const token = new TimeStamp().UTC();
        const fact = new CreateCredentialServiceFact(token, sender, this._address, this._credentialID, currency);
        return new OperationType(this._networkID, fact);
    }
    /** Description of templateData **
      templateData = {
          templateId: number,
          templateName: string,
          serviceDate: date,
          expirationDate: date,
          templateShare: boolean,
          multiAudit: boolean,
          displayName: string,
          subjectKey: string,
          description: string,
          creator: string,
      }
    */
    addTemplate(sender, data, currency) {
        const token = new TimeStamp().UTC();
        const fact = new AddTemplateFact(token, sender, this._address, this._credentialID, data.templateId, data.templateName, data.serviceDate, data.expirationDate, data.templateShare, data.multiAudit, data.displayName, data.subjectKey, data.description, data.creator, currency);
        return new OperationType(this._networkID, fact);
    }
    /** Description of issueData **
      issueData = {
          holder: string,
          templateId: number,
          id: string,
          value: string,
          validFrom: number,
          validUntil: number,
          did: string,
      }
    */
    issue(sender, data, currency) {
        const token = new TimeStamp().UTC();
        const item = new AssignCredentialsItem(this._address, this._credentialID, data.holder, data.templateId, data.id, data.value, data.validFrom, data.validUntil, data.did, currency);
        const fact = new AssignCredentialsFact(token, sender, [item]);
        return new OperationType(this._networkID, fact);
    }
    revoke(sender, holder, templateId, id, currency) {
        const token = new TimeStamp().UTC();
        const item = new RevokeCredentialsItem(this._address, this._credentialID, holder, templateId, id, currency);
        const fact = new RevokeCredentialsFact(token, sender, [item]);
        return new OperationType(this._networkID, fact);
    }
    async getCredential(id, credentialId) {
        let serviceId = this._credentialID;
        if (credentialId !== undefined) {
            serviceId = credentialId;
        }
        const res = await credentialInfo.getCredentialInfo(this._node, this._address, id, serviceId);
        return res.data;
    }
}
//# sourceMappingURL=index.js.map