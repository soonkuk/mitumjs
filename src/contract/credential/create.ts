import { Address } from "../../account/address";
import { ContractID, CurrencyID } from "../../types/property";
import { Fact } from "../../types/fact";
import { FactJson } from "../../types/iFact";

const CreateCredentialServiceFactHint =
  "mitum-credential-create-credential-service-operation-fact";
const CreateCredentialServiceHint =
  "mitum-credential-create-credential-service-operation";

export class CreateCredentialServiceFact extends Fact {
  readonly sender: Address;
  readonly contract: Address;
  readonly credentialServiceID: ContractID;
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
