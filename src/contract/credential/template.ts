import { ContractID, CurrencyID } from "../../types/property.js";
import { Boolean } from "../../types/boolean.js";
import { TimeStamp } from "../../utils/time.js";
import { FactJson } from "../../types/iFact.js";
import { String } from "../../types/string.js";
import { Fact } from "../../types/fact.js";
import { Big } from "../../utils/math.js";

import { Address } from "../../account/address.js";

const AddTemplateFactHint = "mitum-credential-add-template-operation-fact";
const AddTemplateHint = "mitum-credential-add-template-operation";

export class AddTemplateFact extends Fact {
  readonly sender: Address;
  readonly contract: Address;
  readonly credentialServiceID: ContractID;
  readonly templateID: Big;
  readonly templateName: String;
  readonly serviceDate: TimeStamp;
  readonly expirationDate: TimeStamp;
  readonly templateShare: Boolean;
  readonly multiAudit: Boolean;
  readonly displayName: String;
  readonly subjectKey: String;
  readonly description: String;
  readonly creator: Address;
  readonly currency: CurrencyID;

  constructor(
    token: string,
    sender: string,
    contract: string,
    credentialServiceID: string,
    templateID: number,
    templateName: string,
    serviceDate: string,
    expirationDate: string,
    templateShare: boolean,
    multiAudit: boolean,
    displayName: string,
    subjectKey: string,
    description: string,
    creator: string,
    currency: string
  ) {
    super(AddTemplateFactHint, token);

    this.sender = new Address(sender);
    this.contract = new Address(contract);
    this.credentialServiceID = new ContractID(credentialServiceID);
    this.templateID = new Big(templateID);
    this.templateName = new String(templateName);
    this.serviceDate = new TimeStamp(serviceDate);
    this.expirationDate = new TimeStamp(expirationDate);
    this.templateShare = new Boolean(templateShare);
    this.multiAudit = new Boolean(multiAudit);
    this.displayName = new String(displayName);
    this.subjectKey = new String(subjectKey);
    this.description = new String(description);
    this.creator = new Address(creator);
    this.currency = new CurrencyID(currency);

    this._hash = this.hashing();
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      this.token.toBuffer(),
      this.sender.toBuffer(),
      this.contract.toBuffer(),
      this.credentialServiceID.toBuffer(),
      this.templateID.toBuffer("fill"),
      this.templateName.toBuffer(),
      this.serviceDate.toBuffer(),
      this.expirationDate.toBuffer(),
      this.templateShare.toBuffer(),
      this.multiAudit.toBuffer(),
      this.displayName.toBuffer(),
      this.subjectKey.toBuffer(),
      this.description.toBuffer(),
      this.creator.toBuffer(),
      this.currency.toBuffer(),
    ]);
  }

  toHintedObject(): FactJson {
    return {
      ...super.toHintedObject(),
      sender: this.sender.toString(),
      contract: this.contract.toString(),
      credentialServiceID: this.credentialServiceID.toString(),
      templateID: this.templateID.v,
      templateName: this.templateName.toString(),
      serviceDate: this.serviceDate.toString(),
      expirationDate: this.expirationDate.toString(),
      templateShare: this.templateShare.v,
      multiAudit: this.multiAudit.v,
      displayName: this.displayName.toString(),
      subjectKey: this.subjectKey.toString(),
      description: this.description.toString(),
      creator: this.creator.toString(),
      currency: this.currency.toString(),
    };
  }

  get operationHint() {
    return AddTemplateHint;
  }
}
