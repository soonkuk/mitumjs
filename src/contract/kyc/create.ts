import { ContractID, CurrencyID } from "../../types/property.js";
import { FactJson } from "../../types/iFact.js";
import { Fact } from "../../types/fact.js";
import { Address } from "../../account/address.js";
import { Assert, MitumError, ECODE } from "../../utils/error.js";
import { SortFunc } from "../../utils/math.js";

const CreateKYCServiceFactHint = "mitum-kyc-create-key-service-operation-fact";
const CreateKYCServiceHint = "mitum-kyc-create-key-service-operation";

export class CreateKYCServiceFact extends Fact {
  readonly sender: Address;
  readonly contract: Address;
  readonly serviceId: ContractID;
  readonly controllers: Address[];
  readonly currency: CurrencyID;

  constructor(
    token: string,
    sender: string,
    contract: string,
    serviceId: string,
    controllers: string[],
    currency: string
  ) {
    super(CreateKYCServiceFactHint, token);

    this.sender = new Address(sender);
    this.contract = new Address(contract);
    this.serviceId = new ContractID(serviceId);
    this.currency = new CurrencyID(currency);

    const cSet = new Set(controllers);
    Assert.check(
      cSet.size === controllers.length,
      MitumError.detail(
        ECODE.INVALID_PARAMETER,
        "There are duplicate elements in controllers."
      )
    );

    this.controllers = controllers.map((c) => new Address(c));

    this._hash = this.hashing();
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      this.token.toBuffer(),
      this.sender.toBuffer(),
      this.contract.toBuffer(),
      this.serviceId.toBuffer(),
      Buffer.concat(this.controllers.sort(SortFunc).map((c) => c.toBuffer())),
      this.currency.toBuffer(),
    ]);
  }

  toHintedObject(): FactJson {
    return {
      ...super.toHintedObject(),
      sender: this.sender.toString(),
      contract: this.contract.toString(),
      kycid: this.serviceId.toString(),
      controllers: this.controllers.sort(SortFunc).map((c) => c.toString()),
      currency: this.currency.toString(),
    };
  }

  get operationHint() {
    return CreateKYCServiceHint;
  }
}
