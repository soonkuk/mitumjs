import { Address } from "../../account/address";
import { ContractID, CurrencyID } from "../../types/property";
import { Fact } from "../../types/fact";
import { FactJson } from "../../types/iFact";
import { String } from "../../types/string";

const AddTemplateFactHint = "mitum-credential-add-template-operation-fact";
const AddTemplateHint = "mitum-credential-add-template-operation";

export class AddTemplateFact extends Fact {
  readonly sender: Address;
  readonly contract: Address;
  readonly credentialServiceID: ContractID;
  readonly templateID: Big;
  readonly templateName: string
	serviceDate         types.Date
	expirationDate      types.Date
	templateShare       types.Bool
	multiAudit          types.Bool
	displayName         string
	subjectKey          string
	description         string
	creator             base.Address
  readonly currency: CurrencyID;


	


  constructor(
    token: string,
    sender: string,
    contract: string,
    credentialServiceID: string,
    currency: string
  ) {
    super(CreateCredentialServiceFactHint, token);

    this.sender = new Address(sender);
    this.contract = new Address(contract);
    this.credentialServiceID = new ContractID(credentialServiceID);
    this.currency = new CurrencyID(currency);

    this._hash = this.hashing();
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      this.token.toBuffer(),
      this.sender.toBuffer(),
      this.contract.toBuffer(),
      this.credentialServiceID.toBuffer(),
      this.currency.toBuffer(),
    ]);
  }

  toHintedObject(): FactJson {
    return {
      ...super.toHintedObject(),
      sender: this.sender.toString(),
      contract: this.contract.toString(),
      credentialServiceID: this.credentialServiceID.toString(),
      currency: this.currency.toString(),
    };
  }

  get operationHint() {
    return CreateCredentialServiceHint;
  }
}
