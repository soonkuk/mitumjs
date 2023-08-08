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
        this._serviceID = "";
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
    setServiceId(serviceId) {
        if (this._serviceID !== serviceId) {
            this._serviceID = serviceId;
            console.log("Credential ID is changed : ", this._serviceID);
        }
    }
    getContractAddress() {
        return this._address.toString();
    }
    getServiceId() {
        return this._serviceID.toString();
    }
    createCredentialService(sender, serviceId, currency) {
        this.setServiceId(serviceId);
        const token = new TimeStamp().UTC();
        const fact = new CreateCredentialServiceFact(token, sender, this._address, this._serviceID, currency);
        return new OperationType(this._networkID, fact);
    }
    /** Description of templateData **
      templateData = {
          templateId: string,
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
        const fact = new AddTemplateFact(token, sender, this._address, this._serviceID, data.templateId, data.templateName, data.serviceDate, data.expirationDate, data.templateShare, data.multiAudit, data.displayName, data.subjectKey, data.description, data.creator, currency);
        return new OperationType(this._networkID, fact);
    }
    /** Description of issueData **
      issueData = {
          holder: string,
          templateId: string,
          id: string,
          value: string,
          validFrom: number,
          validUntil: number,
          did: string,
      }
    */
    issue(sender, data, currency) {
        const token = new TimeStamp().UTC();
        const item = new AssignCredentialsItem(this._address, this._serviceID, data.holder, data.templateId, data.id, data.value, data.validFrom, data.validUntil, data.did, currency);
        const fact = new AssignCredentialsFact(token, sender, [item]);
        return new OperationType(this._networkID, fact);
    }
    revoke(sender, holder, templateId, id, currency) {
        const token = new TimeStamp().UTC();
        const item = new RevokeCredentialsItem(this._address, this._serviceID, holder, templateId, id, currency);
        const fact = new RevokeCredentialsFact(token, sender, [item]);
        return new OperationType(this._networkID, fact);
    }
    async getServiceInfo(serviceId) {
        let sid = this._serviceID;
        if (serviceId !== undefined) {
            sid = serviceId;
        }
        const res = await credentialInfo.getServiceInfo(this._node, this._address, sid);
        return res.data;
    }
    async getCredentialInfo(serviceId, templateId, credentialId) {
        const res = await credentialInfo.getCredentialInfo(this._node, this._address, serviceId, templateId, credentialId);
        return res.data;
    }
    async getTemplate(serviceId, templateId) {
        const res = await credentialInfo.getTemplate(this._node, this._address, serviceId, templateId);
        return res.data;
    }
    async claimCredential(serviceID, holder) {
        const res = await credentialInfo.getCredentialByHolder(this._node, this._address, serviceID, holder);
        return res.data;
    }
}
//# sourceMappingURL=index.js.map