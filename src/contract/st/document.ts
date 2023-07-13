import { ContractID, CurrencyID } from "../../types/property.js";
import { FactJson } from "../../types/iFact.js";
import { Fact } from "../../types/fact.js";
import { String } from "../../types/string.js";
import { Address } from "../../account/address.js";

const SetDocumentFactHint = "mitum-sto-set-document-operation-fact";
const SetDocumentHint = "mitum-sto-set-document-operation";

export class SetDocumentFact extends Fact {
  readonly sender: Address;
  readonly contract: Address;
  readonly serviceId: ContractID;
  readonly title: String;
  readonly uri: String;
  readonly documentHash: String;
  readonly currency: CurrencyID;

  constructor(
    token: string,
    sender: string,
    contract: string,
    serviceId: string,
    title: string,
    uri: string,
    documentHash: string,
    currency: string
  ) {
    super(SetDocumentFactHint, token);

    this.sender = new Address(sender);
    this.contract = new Address(contract);
    this.serviceId = new ContractID(serviceId);
    this.title = new String(title);
    this.uri = new String(uri);
    this.documentHash = new String(documentHash);
    this.currency = new CurrencyID(currency);

    this._hash = this.hashing();
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      this.token.toBuffer(),
      this.sender.toBuffer(),
      this.contract.toBuffer(),
      this.serviceId.toBuffer(),
      this.title.toBuffer(),
      this.uri.toBuffer(),
      this.documentHash.toBuffer(),
      this.currency.toBuffer(),
    ]);
  }

  toHintedObject(): FactJson {
    return {
      ...super.toHintedObject(),
      sender: this.sender.toString(),
      contract: this.contract.toString(),
      stoid: this.serviceId.toString(),
      title: this.title.toString(),
      uri: this.uri.toString(),
      documenthash: this.documentHash.toString(),
      currency: this.currency.toString(),
    };
  }

  get operationHint() {
    return SetDocumentHint;
  }
}
