import { AxiosResponse } from "axios";

import { OperationType } from "../../types/operation.js";
import { isIPAddress } from "../../utils/validation.js";
import { isAddress } from "../../utils/validation.js";
import { TimeStamp } from "../../utils/time.js";
import { Fact } from "../../types/fact.js";

import { AssignCredentialsFact, AssignCredentialsItem } from "./assign.js";
import { RevokeCredentialsFact, RevokeCredentialsItem } from "./revoke.js";
import { CreateCredentialServiceFact } from "./create.js";
import { templateData, issueData } from "./design.js";
import { AddTemplateFact } from "./template.js";
import credentialInfo from "./information.js";

export class Credential {
  private _networkID: string = "";
  private _node: string = "";
  private _address: string = "";
  private _credentialID: string = "";

  constructor(networkID: string, provider?: string) {
    this._setNode(provider);
    this._setChain(networkID);
  }

  private _setNode(provider?: string) {
    if (isIPAddress(provider)) {
      this._node = provider as string;
    }
  }

  private _setChain(networkID: string) {
    this._networkID = networkID;
  }

  setContractAddress(contractAddress: string) {
    if (this._address !== contractAddress && isAddress(contractAddress)) {
      this._address = contractAddress;
      console.log("Contract address is changed : ", this._address);
    } else {
      console.error("This is invalid address type");
    }
  }

  setCredentialId(_credentialID: string) {
    if (this._credentialID !== _credentialID) {
      this._credentialID = _credentialID;
      console.log("Collection ID is changed : ", this._credentialID);
    } else {
      console.error("This is invalid collection ID type");
    }
  }

  getContractAddress(): string {
    return this._address.toString();
  }

  getCredentialId(): string {
    return this._credentialID.toString();
  }

  createCredential(sender: string, currency: string): OperationType<Fact> {
    const token = new TimeStamp().UTC();

    const fact = new CreateCredentialServiceFact(
      token,
      sender,
      this._address,
      this._credentialID,
      currency
    );

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
  addTemplate(
    sender: string,
    data: templateData,
    currency: string
  ): OperationType<Fact> {
    const token = new TimeStamp().UTC();

    const fact = new AddTemplateFact(
      token,
      sender,
      this._address,
      this._credentialID,
      data.templateId,
      data.templateName,
      data.serviceDate,
      data.expirationDate,
      data.templateShare,
      data.multiAudit,
      data.displayName,
      data.subjectKey,
      data.description,
      data.creator,
      currency
    );

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
  issue(
    sender: string,
    data: issueData,
    currency: string
  ): OperationType<Fact> {
    const token = new TimeStamp().UTC();

    const item = new AssignCredentialsItem(
      this._address,
      this._credentialID,
      data.holder,
      data.templateId,
      data.id,
      data.value,
      data.validFrom,
      data.validUntil,
      data.did,
      currency
    );
    const fact = new AssignCredentialsFact(token, sender, [item]);

    return new OperationType(this._networkID, fact);
  }

  revoke(
    sender: string,
    holder: string,
    templateId: number,
    id: string,
    currency: string
  ): OperationType<Fact> {
    const token = new TimeStamp().UTC();

    const item = new RevokeCredentialsItem(
      this._address,
      this._credentialID,
      holder,
      templateId,
      id,
      currency
    );
    const fact = new RevokeCredentialsFact(token, sender, [item]);

    return new OperationType(this._networkID, fact);
  }

  async getCredential(
    id: string,
    credentialId?: string
  ): Promise<AxiosResponse> {
    let serviceId = this._credentialID;

    if (credentialId !== undefined) {
      serviceId = credentialId;
    }

    const res = await credentialInfo.getCredentialInfo(
      this._node,
      this._address,
      id,
      serviceId
    );

    return res.data;
  }
}
